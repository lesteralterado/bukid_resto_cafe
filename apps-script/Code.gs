/**
 * Bukid Resto Cafe: saves website reservations and contact messages to this Google Sheet
 * and emails staff about each new lead.
 *
 * Setup (once):
 * 1. Create a Google Sheet, then Extensions > Apps Script. Paste this file in as Code.gs.
 * 2. Project Settings > Script properties: add NOTIFY_EMAIL = the inbox that should get alerts
 *    (comma-separate several addresses).
 * 3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 * 4. Copy the web-app URL into VITE_SHEETS_ENDPOINT in the website's .env.local and rebuild.
 * After any edit to this script, use Deploy > Manage deployments > Edit > New version.
 */

var HEADERS = [
  'Received', 'Type', 'Status', 'Name', 'Phone', 'Email', 'Date', 'Time', 'Guests',
  'Occasion', 'Topic', 'Message', 'Heard from', 'UTM source', 'UTM medium', 'UTM campaign',
  'Referrer', 'Landing page',
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var data = JSON.parse(e.postData.contents);

    if (data.company) return json({ ok: true }); // honeypot filled: bot
    if (!data.name || (!data.phone && !data.email)) return json({ ok: false, error: 'Missing name or contact.' });

    var sheetName = data.type === 'contact' ? 'Messages' : 'Reservations';
    var sheet = getSheet(sheetName);
    sheet.appendRow([
      new Date(), clean(data.type), 'New', clean(data.name), clean(data.phone), clean(data.email),
      clean(data.date), clean(data.time), clean(data.guestCount), clean(data.occasion), clean(data.topic),
      clean(data.message), clean(data.heardFrom), clean(data.utm_source), clean(data.utm_medium),
      clean(data.utm_campaign), clean(data.referrer), clean(data.landing_page),
    ]);

    notify(data);
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'Server error' });
  } finally {
    lock.releaseLock();
  }
}

function getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

// Prevents spreadsheet formula injection (values starting with = + - @) and trims long input.
function clean(value) {
  if (value === undefined || value === null) return '';
  var text = String(value).slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function notify(data) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  var isReservation = data.type !== 'contact';
  var subject = isReservation
    ? 'New reservation: ' + clean(data.name) + ', ' + clean(data.date) + ' ' + clean(data.time) + ' (' + clean(data.guestCount) + ' pax)'
    : 'New message: ' + clean(data.topic) + ' from ' + clean(data.name);
  var lines = [
    'Name: ' + clean(data.name),
    'Phone: ' + clean(data.phone),
    'Email: ' + clean(data.email),
  ];
  if (isReservation) {
    lines.push('Date: ' + clean(data.date), 'Time: ' + clean(data.time), 'Guests: ' + clean(data.guestCount), 'Occasion: ' + clean(data.occasion));
  }
  lines.push('Message: ' + clean(data.message), 'Heard from: ' + clean(data.heardFrom), '', 'Reply fast: guests who get a quick text are far more likely to show up.');
  MailApp.sendEmail(to, subject, lines.join('\n'));
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
