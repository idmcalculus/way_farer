"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pool = _interopRequireDefault(require("../models/pool"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var bookings = {
  createBooking: function createBooking(req, res) {
    var _req$body = req.body,
        token = _req$body.token,
        user_id = _req$body.user_id,
        is_admin = _req$body.is_admin,
        trip_id = _req$body.trip_id,
        booking_id = _req$body.booking_id,
        bus_id = _req$body.bus_id,
        seat_number = _req$body.seat_number,
        first_name = _req$body.first_name,
        last_name = _req$body.last_name,
        email = _req$body.email;

    _pool["default"].query("INSERT INTO \n    bookings(booking_id, bus_id, seat_number, first_name, last_name, email)\n    VALUES($1, $2, $3, $4, $5, $6)\n    RETURNING *", [booking_id, bus_id, seat_number, first_name, last_name, email]).then(function (result) {
      res.send({
        status: 'success',
        data: {
          booking_id: result.rows[0].booking_id,
          user_id: result.rows[0].id,
          trip_id: result.rows[0].id,
          bus_id: result.rows[0].bus_id,
          trip_date: result.rows[0].trip_date,
          seat_number: result.rows[0].seat_number,
          first_name: result.rows[0].first_number,
          last_name: result.rows[0].last_name,
          email: result.rows[0].email
        }
      });
    })["catch"](function (err) {
      res.status(500).send({
        status: 'error',
        error: 'internal server error'
      });
    });
  },
  getBookings: function getBookings(req, res) {
    _pool["default"].query("SELECT * FROM bookings;").then(function (result) {
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
  deleteBookings: function deleteBookings(req, res) {
    var bookingId = req.params.bookingId;

    _pool["default"].query("DELETE FROM bookings WHERE booking_id = ($1)\n        RETURNING *;", [bookingId]).then(function (result) {
      res.status(201).send({
        status: 'success',
        data: {
          message: 'Booking deleted successfuly'
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
var _default = bookings;
exports["default"] = _default;