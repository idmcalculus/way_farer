"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _trips = _interopRequireDefault(require("./routes/trips"));

var _bookings = _interopRequireDefault(require("./routes/bookings"));

var _models = _interopRequireDefault(require("./models/models"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("core-js/stable");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dotenv["default"].config();

var app = (0, _express["default"])(); //use middlewares

app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: true
})); // mount routers

app.use('/api/v1/auth', _auth["default"]);
app.use('/api/v1/trips', _trips["default"]);
app.use('/api/v1/bookings', _bookings["default"]); //create database tables

(0, _models["default"])();
app.get('/', function (req, res) {
  return res.status(200).send({
    message: 'We are LIVE!!!'
  });
});
var port = process.env.PORT;

if (port == null || port == '') {
  port = 8000;
}

var server = app.listen(port, function () {
  return console.log("Listening on port ".concat(port, "..."));
});
var _default = server;
exports["default"] = _default;