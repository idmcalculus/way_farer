"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pool = _interopRequireDefault(require("../models/pool"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var trips = {
  createTrip: function createTrip(req, res) {
    var _req$body = req.body,
        token = _req$body.token,
        user_id = _req$body.user_id,
        is_admin = _req$body.is_admin,
        bus_id = _req$body.bus_id,
        origin = _req$body.origin,
        destination = _req$body.destination,
        fare = _req$body.fare;

    _pool["default"].query("INSERT INTO \n    trips(bus_id, origin, destination, fare)\n    VALUES($1, $2, $3, $4)\n    RETURNING *", [bus_id, origin, destination, fare]).then(function (result) {
      res.send({
        status: 'success',
        data: {
          trip_id: result.rows[0].id,
          bus_id: result.rows[0].bus_id,
          origin: result.rows[0].origin,
          destination: result.rows[0].destination,
          trip_date: result.rows[0].trip_date,
          fare: result.rows[0].fare
        }
      });
    })["catch"](function (err) {
      res.status(500).send({
        status: 'error',
        error: 'internal server error'
      });
    });
  },
  getTrips: function getTrips(req, res) {
    _pool["default"].query("SELECT * FROM trips;").then(function (result) {
      res.send({
        status: 'success',
        data: result.rows
      });
    })["catch"](function (err) {
      res.status(500).send({
        status: 'error',
        error: 'internal server error'
      });
    });
  },
  updateTrips: function updateTrips(req, res) {
    var tripId = req.params.tripId;

    _pool["default"].query("\n        UPDATE trips SET status = ($1) WHERE id = ($2)\n        RETURNING *", ['cancel', tripId]).then(function (result) {
      res.status(201).send({
        status: 'success',
        data: {
          message: 'Trip cancelled succesfully'
        }
      });
    })["catch"](function (err) {
      res.status(500).send({
        status: 'error',
        error: 'internal server error'
      });
    });
  }
};
var _default = trips;
exports["default"] = _default;