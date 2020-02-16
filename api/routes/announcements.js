const express = require("express");
const router = express.Router();

const {
  getAnnouncements,
  getAnnouncement,
  getAnnouncementsParsed
} = require("../controllers/announcements");

router.route("/parsed").get(getAnnouncementsParsed);
router.route("/").get(getAnnouncements);
router.route("/:entry_id").get(getAnnouncement);

module.exports = router;
