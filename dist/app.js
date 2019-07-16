"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _trips = _interopRequireDefault(require("./routes/trips"));

var _bookings = _interopRequireDefault(require("./routes/bookings"));

var _models = _interopRequireDefault(require("./models/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var app = (0, _express["default"])(); //use middlewares

app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: true
})); // mount routers

app.use('/api/v1/auth', _auth["default"]);
app.use('/api/v1/trips', _trips["default"]);
app.use('/api/v1/bookings', _bookings["default"]); //create database tables

(0, _models["default"])();
var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});
var _default = server;
exports["default"] = _default;