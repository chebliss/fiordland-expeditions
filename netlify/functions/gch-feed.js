// netlify/functions/gch-feed.js
//
// Guest Content Hub — public Expedition Feed reader.
// Returns all records with status=featured, regardless of vessel/cruise.
// Powers the Expedition Feed tab on /gch. Moderators promote approved
// private-gallery content to `featured` to surface it publicly.

const AIRTABLE_API_KEY = (process.env.AIRTABLE_API_KEY || '').trim();
const AIRTABLE_BASE_ID = (process.env.AIRTABLE_BASE_ID || '').trim();
const AIRTABLE_TABLE = 'Uploads';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60', ...CORS },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return json(500, { error: 'Airtable credentials not configured.' });
  }

  // Only featured content appears publicly. Approved (non-featured) stays
  // private to the cruise. Moderator must opt-in by flipping to featured.
  const filter = `{status}="featured"`;

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
      vessel: f.vessel || '',
      cruise_date: f.cruise_date || '',
      guest_last_name: f.guest_last_name || '',
      notes: f.notes || '',
      uploaded_at: f.uploaded_at || null,
    };
  }).filter((a) => a.cloudinary_url);

  return json(200, {
    ok: true,
    count: assets.length,
    assets,
  });
};
