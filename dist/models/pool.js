"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'user_db',
  password: 'ma13ka2la',
  port: 5432
};
var pool = new _pg.Pool(connectionString);
var _default = pool;
exports["default"] = _default;