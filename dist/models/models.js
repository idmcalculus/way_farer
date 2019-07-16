"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pool = _interopRequireDefault(require("./pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var models = function models() {
  var usersTable = "CREATE TABLE IF NOT EXISTS users(\n        id SERIAL PRIMARY KEY,\n        first_name VARCHAR NOT NULL,\n        last_name VARCHAR NOT NULL,\n        email VARCHAR NOT NULL UNIQUE,\n        password VARCHAR NOT NULL,\n        is_admin BOOLEAN NOT NULL DEFAULT true\n    );";
  var tripsTable = "CREATE TABLE IF NOT EXISTS trips(\n        id SERIAL PRIMARY KEY,\n        bus_id INTEGER NOT NULL,\n        origin VARCHAR NOT NULL,\n        destination VARCHAR NOT NULL,\n        trip_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\n        fare NUMERIC(15,2) NOT NULL,\n        status VARCHAR NOT NULL DEFAULT 'active'\n    );";
  var bookingsTable = "CREATE TABLE IF NOT EXISTS bookings(\n        booking_id INTEGER NOT NULL,\n        id SERIAL PRIMARY KEY,        \n        bus_id INTEGER NOT NULL,\n        trip_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\n        seat_number INTEGER NOT NULL,\n        first_name VARCHAR NOT NULL,\n        last_name VARCHAR NOT NULL,\n        email VARCHAR NOT NULL UNIQUE,\n        status VARCHAR NOT NULL DEFAULT 'active'\n    );";

  _pool["default"].query("".concat(usersTable, "\n        ").concat(tripsTable, "\n        ").concat(bookingsTable)).then()["catch"]();
};

var _default = models;
exports["default"] = _default;