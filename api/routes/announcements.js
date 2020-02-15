const express = require("express");
const router = express.Router();

const {
  getAnnouncements,
  getAnnouncement
} = require("../controllers/announcements");

router.route("/").get(getAnnouncements);
router.route("/:entry_id").get(getAnnouncement);

module.exports = router;
