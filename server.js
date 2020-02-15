// Import dependencies
const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");

// Import api
const announcements = require("./api/routes/announcements");
const calendars = require("./api/routes/calendars");
const prayers = require("./api/routes/prayers");

// Initialize Express App
const app = express();

// Use Body Parser Middleware for HTTP Requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set headers for responses
app.use(function(req, res, next) {
  //allow cross origin requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  res.header("Access-Control-Allow-Origin", "localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Use API Routes
app.use("/api/v1/announcements", announcements);
app.use("/api/v1/calendars", calendars);
app.use("/api/v1/prayers", prayers);

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Declare server port
const port = process.env.PORT;

// Listen on port
app.listen(port, () => console.log(`Server running on port ${port}`));
