const asyncHandler = require("../middleware/async");
const lowercaseKeys = require("lowercase-keys");
const axios = require("axios");

// @desc      Get prayers for given day
// @route     GET /api/v1/prayers for today's prayers
// @route     GET /api/v1/prayers/:date
// @access    Public
exports.getPrayers = asyncHandler(async (req, res, next) => {
  let url;
  if (req.params.date) {
    url = `https://raleighmasjid.org/API/prayer/?date=${req.params.date}`;
  } else {
    url = `https://raleighmasjid.org/API/prayer/`;
  }

  await axios
    .get(url)
    .then(response => {
      const hijri = lowercaseKeys(response.data.hijri);
      const adhan = lowercaseKeys(response.data.adhan);
      const iqamah = lowercaseKeys(response.data.iqamah);

      res.status(200).json({
        success: true,
        hijri,
        adhan,
        iqamah
      });
    })
    .catch(err => {
      return next(new ErrorResponse(`Prayers Error: ${err.message}`, 404));
    });
});
