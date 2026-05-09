#!/usr/bin/env python3
"""
Bulk-flip Cloudinary access_mode from 'authenticated' to 'public' for every
asset under the fel/derek-2026/ prefix.

Why: assets uploaded under a Signed upload preset land with
access_mode='authenticated', which means delivery URLs return HTTP 403 unless
they carry a server-side signature. Static HTML can't sign URLs (would leak
api_secret), so the fix is to flip access_mode to public on existing assets.

This is the second of two recovery steps for the staging hero issue:
  1. Path correction (commit 9e7ce6d, separate fix).
  2. THIS SCRIPT: access_mode authenticated -> public.

Usage:
    export CLOUDINARY_API_KEY=...
    export CLOUDINARY_API_SECRET=...
    pip install requests        # if not already installed
    python3 flip_access_mode.py

Idempotent: safe to run multiple times. Already-public assets get a no-op
update (Cloudinary returns them in the 'updated' list either way).

Scope: hardcoded to fel/derek-2026/ prefix only. Will not touch any asset
outside that prefix even if account credentials have wider permissions.
"""

import os
import sys
import time

try:
    import requests
    from requests.auth import HTTPBasicAuth
except ImportError:
    print("ERROR: install requests first ->  pip install requests")
    sys.exit(1)


CLOUD_NAME = "dbfwdxsaz"
PREFIX = "fel/derek-2026/"
TARGET_ACCESS_MODE = "public"
RESOURCE_TYPE = "image"
DELIVERY_TYPE = "upload"
PAGE_SIZE = 500          # Cloudinary list paging max
BATCH_SIZE = 100         # Cloudinary update_access_mode bulk limit
THROTTLE_SECONDS = 0.4   # gentle on rate limits

SPOT_CHECK_URL = (
    f"https://res.cloudinary.com/{CLOUD_NAME}/image/upload/"
    f"f_auto,q_auto,w_640/{PREFIX}hero-vessel-experience/"
    "fiordland-expeditions-mv-tutoko-ii-sunrise-mirror-reflection-mist-"
    "doubtful-sound-dji0080"
)


def env(name):
    val = os.environ.get(name)
    if not val:
        print(f"ERROR: {name} is not set in the environment.")
        sys.exit(1)
    return val


def list_public_ids(auth):
    base = f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/resources/{RESOURCE_TYPE}"
    ids = []
    next_cursor = None
    page = 0
    while True:
        page += 1
        params = {
            "type": DELIVERY_TYPE,
            "prefix": PREFIX,
            "max_results": PAGE_SIZE,
        }
        if next_cursor:
            params["next_cursor"] = next_cursor
        r = requests.get(base, params=params, auth=auth, timeout=30)
        r.raise_for_status()
        data = r.json()
        batch = [res["public_id"] for res in data.get("resources", [])]
        ids.extend(batch)
        print(f"  page {page}: listed {len(batch)} (running total: {len(ids)})")
        next_cursor = data.get("next_cursor")
        if not next_cursor:
            break
    return ids


def flip_batch(auth, public_ids):
    """One bulk-update call. Returns (updated_count, failed_list)."""
    url = (
        f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/resources/"
        f"{RESOURCE_TYPE}/{DELIVERY_TYPE}/update_access_mode"
    )
    data = [("access_mode", TARGET_ACCESS_MODE)]
    for pid in public_ids:
        data.append(("public_ids[]", pid))
    r = requests.post(url, data=data, auth=auth, timeout=60)
    if r.status_code != 200:
        print(f"    HTTP {r.status_code}: {r.text[:200]}")
        return 0, public_ids
    body = r.json()
    return len(body.get("updated", [])), body.get("failed", [])


def spot_check():
    print(f"\nSpot-check: HEAD {SPOT_CHECK_URL}")
    try:
        r = requests.head(SPOT_CHECK_URL, timeout=20, allow_redirects=True)
        print(f"  HTTP {r.status_code}")
        if r.status_code == 200:
            print("  DELIVERY VERIFIED. Heroes will resolve on staging.")
            return True
        print("  Still blocked. Possible CDN cache lag (try again in 60s).")
        return False
    except Exception as exc:
        print(f"  Network error: {exc}")
        return False


def main():
    api_key = env("CLOUDINARY_API_KEY")
    api_secret = env("CLOUDINARY_API_SECRET")
    auth = HTTPBasicAuth(api_key, api_secret)

    print(f"Cloud name:     {CLOUD_NAME}")
    print(f"Prefix:         {PREFIX}")
    print(f"Target mode:    {TARGET_ACCESS_MODE}")
    print()

    print("Listing assets...")
    public_ids = list_public_ids(auth)
    total = len(public_ids)
    print(f"\nFound {total} assets under {PREFIX}\n")
    if total == 0:
        print("Nothing to update. Exiting.")
        return

    print(f"Updating access_mode -> {TARGET_ACCESS_MODE} in batches of {BATCH_SIZE}...")
    updated_total = 0
    failed_total = []
    batch_count = (total + BATCH_SIZE - 1) // BATCH_SIZE
    for i in range(0, total, BATCH_SIZE):
        batch = public_ids[i:i + BATCH_SIZE]
        n = (i // BATCH_SIZE) + 1
        updated, failed = flip_batch(auth, batch)
        updated_total += updated
        failed_total.extend(failed)
        print(f"  batch {n}/{batch_count}: updated {updated}, failed {len(failed)}")
        time.sleep(THROTTLE_SECONDS)

    print(f"\nUpdated total:  {updated_total} of {total}")
    if failed_total:
        print(f"Failed:         {len(failed_total)}")
        for f in failed_total[:10]:
            print(f"  {f}")
        if len(failed_total) > 10:
            print(f"  ... and {len(failed_total) - 10} more")

    spot_check()


if __name__ == "__main__":
    main()
