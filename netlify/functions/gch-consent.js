// netlify/functions/gch-consent.js
//
// Guest Content Hub — consent / metadata writer.
// After a file is uploaded directly to Cloudinary, the browser POSTs the
// Cloudinary response + consent metadata here. We write a single row to the
// Airtable `Uploads` table, which becomes the legal source of truth for UGC
// licensing and the driver of gallery visibility.

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = 'Uploads';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

function sanitiseName(name) {
  if (typeof name !== 'string') return '';
  return name.trim().slice(0, 80);
}

function sanitiseUrl(u) {
  if (typeof u !== 'string') return '';
  return /^https:\/\/res\.cloudinary\.com\//.test(u) ? u : '';
}

function sanitisePublicId(id) {
  if (typeof id !== 'string') return '';
  return id.replace(/[^a-zA-Z0-9_\-/.]/g, '').slice(0, 200);
}

function sanitiseFolder(f) {
  if (typeof f !== 'string') return '';
  return f.replace(/[^a-zA-Z0-9_\-/.]/g, '').slice(0, 200);
}

function sanitiseFileType(t) {
  return t === 'video' ? 'video' : 'image';
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return json(500, { error: 'Airtable credentials not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in Netlify environment variables.' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return json(400, { error: 'Invalid JSON body' });
  }

  const uploadId = sanitisePublicId(payload.upload_id);
  const cloudinaryUrl = sanitiseUrl(payload.cloudinary_url);
  const cloudinaryFolder = sanitiseFolder(payload.cloudinary_folder);
  const vessel = sanitiseVessel(payload.vessel);
  const cruiseDate = sanitiseCruiseDate(payload.cruise_date);
  const guestLastName = sanitiseName(payload.guest_last_name);
  const uploadType = payload.upload_type === 'crew' ? 'crew' : 'guest';
  const fileType = sanitiseFileType(payload.file_type);
  const consentMates = payload.consent_mates === true;
  const consentPublic = payload.consent_public === true;

  if (!uploadId || !cloudinaryUrl) {
    return json(400, { error: 'Missing upload_id or cloudinary_url.' });
  }
  if (!vessel || !cruiseDate) {
    return json(400, { error: 'Missing or invalid vessel / cruise_date.' });
  }

  // All uploads default to approved on creation. Moderators flip
  // records to featured (to surface publicly) or rejected (to hide)
  // from the Airtable view; no separate guest-vs-crew gating.
  const status = 'approved';

  // Also populate an Attachment field so moderators see the image inline in
  // the Airtable row. Airtable fetches the URL when the record is created.
  const attachmentFilename = `${uploadId.split('/').pop() || 'upload'}.${fileType === 'video' ? 'mp4' : 'jpg'}`;

  const fields = {
    upload_id: uploadId,
    vessel,
    cruise_date: cruiseDate,
    guest_last_name: guestLastName,
    upload_type: uploadType,
    consent_mates: consentMates,
    consent_public: consentPublic,
    status,
    cloudinary_url: cloudinaryUrl,
    cloudinary_folder: cloudinaryFolder,
    file_type: fileType,
    image: [{ url: cloudinaryUrl, filename: attachmentFilename }],
  };

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    });
  } catch (e) {
    return json(502, { error: 'Airtable request failed', detail: String(e && e.message || e) });
  }

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }

  if (!res.ok) {
    return json(res.status, { error: 'Airtable rejected the record', airtable: data });
  }

  const record = (data.records && data.records[0]) || null;
  return json(200, {
    ok: true,
    record_id: record ? record.id : null,
    status,
  });
};
