// Paste the Web App URL you get after deploying the Apps Script (ends in /exec)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxtKZtufxEf6D7S8G3uuO5KGt2ix9Y2GoCgun33uOZR3RoWwJ80uhiyo8AL0VQZnBpJYw/exec";

// Helper: GET request to the Apps Script API
async function apiGet(params) {
  const url = new URL(APPS_SCRIPT_URL);
  Object.keys(params || {}).forEach(k => url.searchParams.set(k, params[k]));
  const res = await fetch(url.toString());
  return res.json();
}

// Helper: POST request to the Apps Script API
// Uses text/plain content-type on purpose — this avoids a CORS preflight
// request, which Apps Script web apps cannot handle. Apps Script still
// parses the body fine with JSON.parse(e.postData.contents).
async function apiPost(payload) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
  return res.json();
}
