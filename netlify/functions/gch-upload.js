// netlify/functions/gch-upload.js
//
// Guest Content Hub — signed upload endpoint.
// Returns a Cloudinary upload signature so the browser can POST the
// image/video directly to Cloudinary without passing through Netlify.

const crypto = require('crypto');

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dbfwdxsaz';
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

function generateSignature(params, apiSecret) {
  const sortedKeys = Object.keys(params).sort();
  const toSign = sortedKeys.map((key) => `${key}=${params[key]}`).join('&');
  return crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');
}

function sanitiseVessel(v) {
  return v === 'tutoko1' || v === 'tutoko2' ? v : null;
}

function sanitiseCruiseDate(d) {
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null;
}

function sanitiseName(name) {
  if (typeof name !== 'string') return '';
  return name.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  if (!API_KEY || !API_SECRET) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        error: 'Cloudinary credentials not configured. Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in Netlify environment variables.',
      }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const vessel = sanitiseVessel(payload.vessel);
  const cruiseDate = sanitiseCruiseDate(payload.cruise_date);
  const lastName = sanitiseName(payload.guest_last_name);
  const uploadType = payload.upload_type === 'crew' ? 'crew' : 'guest';

  if (!vessel || !cruiseDate) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        error: 'Missing or invalid vessel / cruise_date. Expected vessel in {tutoko1, tutoko2} and cruise_date as YYYY-MM-DD.',
      }),
    };
  }

  const folder = `fel-gch/${vessel}/${cruiseDate}`;

  const tagParts = [
    'gch',
    `vessel:${vessel}`,
    `cruise:${cruiseDate}`,
    `type:${uploadType}`,
  ];
  if (lastName) tagParts.push(`guest:${lastName}`);
  tagParts.push(uploadType === 'crew' ? 'status:approved' : 'status:pending');
  const tags = tagParts.join(',');

  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = { folder, tags, timestamp };

  const signature = generateSignature(paramsToSign, API_SECRET);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      timestamp,
      signature,
      folder,
      tags,
      upload_url: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    }),
  };
};
