const asyncHandler = require("../middleware/async");
const parse5 = require("parse5");
const mysqlssh = require("mysql-ssh");
const { sshConfig, dbConfig } = require("../config/mysql");

// @desc      Get announcements for the last month
// @route     GET /api/v1/announcements
// @access    Public
exports.getAnnouncements = asyncHandler(async (req, res, next) => {
  await mysqlssh
    .connect(sshConfig, dbConfig)
    .then(client => {
      client.query(
        // SELECT * FROM movabletype.mt_entry WHERE entry_class='page';
        "SELECT entry_id, entry_modified_on, entry_title, entry_excerpt FROM mt_entry WHERE entry_class='entry' ORDER BY entry_modified_on DESC LIMIT 30;",
        function(err, results, fields) {
          if (err) throw err;
          mysqlssh.close();
          res.status(200).json({
            success: true,
            announcements: results
          });
        }
      );
    })
    .catch(err => {
      return next(
        new ErrorResponse(`Announcements Error: ${err.message}`, 404)
      );
    });
});

// @desc      Get single announcement by id
// @route     GET /api/v1/announcements/:id
// @access    Public
exports.getAnnouncement = asyncHandler(async (req, res, next) => {
  await mysqlssh
    .connect(sshConfig, dbConfig)
    .then(client => {
      client.query(
        `SELECT * FROM movabletype.mt_fileinfo 
          INNER JOIN movabletype.mt_entry ON movabletype.mt_entry.entry_id = movabletype.mt_fileinfo.fileinfo_entry_id
          WHERE movabletype.mt_fileinfo.fileinfo_entry_id=${req.params.entry_id};`,
        function(err, results, fields) {
          if (err) throw err;
          // res.json(results);
          mysqlssh.close();
          const announcement = results[0];
          res.status(200).json({
            success: true,
            announcement
          });
        }
      );
    })
    .catch(err => {
      return next(
        new ErrorResponse(`Announcements Error: ${err.message}`, 404)
      );
    });
});

// TODO
// @desc      Get special announcement
// @route     GET /api/v1/announcements/special
// @access    Public
exports.getSpecialAnnouncement = asyncHandler(async (req, res, next) => {});

// @desc      Get announcements for the last month
// @route     GET /api/v1/announcements
// @access    Public
exports.getAnnouncementsParsed = asyncHandler(async (req, res, next) => {
  await mysqlssh
    .connect(sshConfig, dbConfig)
    .then(client => {
      client.query(
        // SELECT * FROM movabletype.mt_entry WHERE entry_class='page';
        // `SELECT entry_id, entry_modified_on, entry_title, entry_excerpt FROM mt_entry WHERE entry_class='entry' ORDER BY entry_modified_on DESC;`,
        "SELECT entry_id, entry_modified_on, entry_title, entry_excerpt FROM mt_entry WHERE entry_class='entry' ORDER BY entry_modified_on DESC LIMIT 30;",
        function(err, results, fields) {
          if (err) throw err;
          mysqlssh.close();
          const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (key, value) => {
              if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                  return;
                }
                seen.add(value);
              }
              return value;
            };
          };

          results.map(result => {
            if (result.entry_excerpt) {
              const doc = parse5.parse(result.entry_excerpt);
              const html = parse5.serialize(doc.childNodes[0].childNodes[1]);
              const doc2 = parse5.parse(html);

              const stringified = JSON.stringify(doc2, getCircularReplacer());

              result.serialHtml = html;
              // result.parsedHtml = JSON.parse(stringified);
              result.parsedHtml = stringified;

              return result;
              // return (result.html = document);
            }
          });

          res.status(200).json({
            success: true,
            announcements: results
          });
        }
      );
    })
    .catch(err => {
      return next(
        new ErrorResponse(`Announcements Error: ${err.message}`, 404)
      );
    });
});
