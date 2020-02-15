const express = require("express");
const router = express.Router();

const { getCalendars } = require("../controllers/calendars");

router.route("/").get(getCalendars);

module.exports = router;
