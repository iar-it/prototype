const asyncHandler = require("../middleware/async");
const { calendar, calendars } = require("../config/gsuite");

const moment = require("moment");

// @desc      Get announcements for the last month
// @route     GET /api/v1/announcements
// @access    Public
exports.getCalendars = asyncHandler(async (req, res, next) => {
  const timeMin = moment()
    //   .add(4, "days")
    .hours(0)
    .minutes(0)
    .seconds(0)
    .toISOString();

  const timeMax = moment()
    //   .add(4, "days")
    .hours(23)
    .minutes(59)
    .seconds(59)
    .toISOString();

  // Initialize an empty events array
  req.events = [];

  // Create a function that will cycle through the calendars and populate the req.events array
  let i = 0;
  calendars.map(id => {
    calendar.events.list(
      {
        calendarId: id,
        timeMin,
        timeMax,
        //   maxResults: 10,
        singleEvents: true,
        orderBy: "startTime"
      },
      (error, result) => {
        if (error) {
          return next(new ErrorResponse(`Calendar Error: ${error}`, 404));
        } else {
          if (result.data.items.length) {
            result.data.items.map(event => {
              req.events.push(event);
            });
            i = i + 1;
          } else {
            i = i + 1;
          }
          if (i === calendars.length) {
            const events = req.events;
            res.status(200).json({
              success: true,
              events
            });
            next();
          }
        }
      }
    );
  });
});

// @desc      Get single announcement by id
// @route     GET /api/v1/announcements/:id
// @access    Public
exports.getAnnouncement = asyncHandler(async (req, res, next) => {});
