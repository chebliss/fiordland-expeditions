// One-off: set consent_public=TRUE on all GCH records that don't already
// have it. Run locally with Airtable credentials.
//
// Usage:
//   AIRTABLE_API_KEY=xxx AIRTABLE_BASE_ID=xxx node scripts/gch-publish-all.js
//
// Field/table names verified against netlify/functions/gch-consent.js:
//   - Table: 'Uploads'
//   - Fields: vessel, cruise_date, guest_last_name, consent_public
//
// Safety: prints what it will do and pauses 10s before making changes.
// Idempotent: re-running skips records already at consent_public=TRUE.

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE = 'Uploads';

if (!API_KEY || !BASE_ID) {
  console.error('Missing AIRTABLE_API_KEY or AIRTABLE_BASE_ID');
  process.exit(1);
}

const TABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`;

async function listRecords() {
  const records = [];
  let offset;
  do {
    const url = new URL(TABLE_URL);
    url.searchParams.set('pageSize', '100');
    if (offset) url.searchParams.set('offset', offset);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const data = await res.json();
    if (data.error) throw new Error(JSON.stringify(data.error));
    records.push(...data.records);
    offset = data.offset;
  } while (offset);
  return records;
}

async function patchRecord(id) {
  const res = await fetch(`${TABLE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields: { consent_public: true } }),
  });
  const data = await res.json();
  if (data.error) throw new Error(`${id}: ${JSON.stringify(data.error)}`);
  return data;
}

(async () => {
  const all = await listRecords();
  const toUpdate = all.filter((r) => r.fields.consent_public !== true);
  console.log(`Total records: ${all.length}`);
  console.log(`Records to update (consent_public not TRUE): ${toUpdate.length}`);
  if (toUpdate.length === 0) {
    console.log('Nothing to do.');
    return;
  }
  console.log('\nFirst 5 records to update:');
  toUpdate.slice(0, 5).forEach((r) => {
    console.log(
      `  ${r.id} | vessel=${r.fields.vessel} | cruise_date=${r.fields.cruise_date} | guest_last_name=${r.fields.guest_last_name}`
    );
  });
  console.log('\nPress Ctrl+C to abort, or wait 10 seconds to proceed...');
  await new Promise((r) => setTimeout(r, 10000));
  let done = 0;
  let failed = 0;
  for (const r of toUpdate) {
    try {
      await patchRecord(r.id);
      done++;
      if (done % 10 === 0) console.log(`  ${done}/${toUpdate.length}`);
      // Airtable rate limit is 5 req/sec per base; 200ms keeps us at the cap.
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error(`Failed ${r.id}: ${err.message}`);
      failed++;
    }
  }
  console.log(`\nDone. Updated: ${done}, Failed: ${failed}`);
})();
