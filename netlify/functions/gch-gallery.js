// netlify/functions/gch-gallery.js
//
// Guest Content Hub — private gallery reader.
// Given a vessel + cruise_date + guest_last_name, returns the approved
// Cloudinary URLs for that cruise. Guests see every approved asset from their
// cruise (not only their own uploads) — shared memories across cruise mates.
// Enforces a 90-day expiry window from the cruise_date.

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = 'Uploads';
const EXPIRY_DAYS = 90;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...CORS },
    body: JSON.stringify(body),
  };
}

function sanitiseVessel(v) {
  return v === 'tutoko1' || v === 'tutoko2' ? v : null;
}

function sanitiseCruiseDate(d) {
  return typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null;
}

function escapeFormulaString(s) {
  // Airtable formulas wrap strings in double quotes; escape embedded quotes.
  return String(s).replace(/"/g, '\\"');
}

function daysSince(isoDate) {
  const cruise = new Date(isoDate + 'T00:00:00Z').getTime();
  const now = Date.now();
  return Math.floor((now - cruise) / (1000 * 60 * 60 * 24));
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return json(500, { error: 'Airtable credentials not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in Netlify environment variables.' });
  }

  const params = event.queryStringParameters || {};
  const vessel = sanitiseVessel(params.vessel);
  const cruiseDate = sanitiseCruiseDate(params.cruise_date);
  // guest_last_name is accepted but not used as a filter — any guest on the
  // cruise can retrieve the shared gallery. We log/echo it for audit only.
  const guestLastName = typeof params.guest_last_name === 'string' ? params.guest_last_name.trim().slice(0, 80) : '';

  if (!vessel || !cruiseDate) {
    return json(400, {
      error: 'Missing or invalid vessel / cruise_date. Expected vessel in {tutoko1, tutoko2} and cruise_date as YYYY-MM-DD.',
    });
  }

  const age = daysSince(cruiseDate);
  if (age > EXPIRY_DAYS) {
    return json(200, {
      ok: true,
      expired: true,
      cruise_date: cruiseDate,
      expiry_days: EXPIRY_DAYS,
      assets: [],
      message: `This cruise gallery expired ${age - EXPIRY_DAYS} day(s) ago. Galleries are available for ${EXPIRY_DAYS} days after the cruise date.`,
    });
  }

  const filter = `AND({vessel}="${escapeFormulaString(vessel)}",{cruise_date}="${escapeFormulaString(cruiseDate)}",OR({status}="approved",{status}="featured"))`;

  const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`);
  url.searchParams.set('filterByFormula', filter);
  url.searchParams.set('pageSize', '100');
  url.searchParams.append('sort[0][field]', 'uploaded_at');
  url.searchParams.append('sort[0][direction]', 'desc');

  let res;
  try {
    res = await fetch(url.toString(), {
      headers: { 'Authorization': `Bearer ${AIRTABLE_API_KEY}` },
    });
  } catch (e) {
    return json(502, { error: 'Airtable request failed', detail: String(e && e.message || e) });
  }

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }

  if (!res.ok) {
    return json(res.status, { error: 'Airtable query failed', airtable: data });
  }

  const records = Array.isArray(data.records) ? data.records : [];
  const assets = records.map((r) => {
    const f = r.fields || {};
    return {
      id: r.id,
      upload_id: f.upload_id || '',
      cloudinary_url: f.cloudinary_url || '',
      file_type: f.file_type || 'image',
      upload_type: f.upload_type || 'guest',
      guest_last_name: f.guest_last_name || '',
      status: f.status || 'approved',
      uploaded_at: f.uploaded_at || null,
    };
  }).filter((a) => a.cloudinary_url);

  return json(200, {
    ok: true,
    expired: false,
    vessel,
    cruise_date: cruiseDate,
    guest_last_name: guestLastName,
    days_remaining: Math.max(0, EXPIRY_DAYS - age),
    count: assets.length,
    assets,
  });
};
