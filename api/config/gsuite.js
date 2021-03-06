const { google } = require("googleapis");

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.GOOGLE_PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID_GYM = process.env.GOOGLE_CALENDAR_ID_GYM;
const GOOGLE_CALENDAR_ID_MASJID_MAIN =
  process.env.GOOGLE_CALENDAR_ID_MASJID_MAIN;
const GOOGLE_CALENDAR_ID_MASJID_WOMENS =
  process.env.GOOGLE_CALENDAR_ID_MASJID_WOMENS;
const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

exports.calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient
});

exports.calendars = [
  GOOGLE_CALENDAR_ID_GYM,
  GOOGLE_CALENDAR_ID_MASJID_MAIN,
  GOOGLE_CALENDAR_ID_MASJID_WOMENS
];
