const express = require("express");
const router = express.Router();

const { getPrayers } = require("../controllers/prayers");

router.route("/").get(getPrayers);
router.route("/:date").get(getPrayers);

module.exports = router;
