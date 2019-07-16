"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _pool = _interopRequireDefault(require("../models/pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = {
  signup: function signup(req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        first_name = _req$body.first_name,
        last_name = _req$body.last_name,
        password = _req$body.password; // check if user is already registered

    _pool["default"].query('SELECT * FROM users WHERE email = ($1)', [email]).then(function (result) {
      if (result.rowCount !== 0) {
        return res.status(409).send({
          status: "error",
          error: "user already exists"
        });
      }
    });

    _pool["default"].query("INSERT INTO \"users\" (\"first_name\", \"last_name\", \"email\", \"password\")\n            VALUES ('".concat(first_name, "','").concat(last_name, "', '").concat(email, "', '").concat(password, "') \n            RETURNING *")).then(function (result) {
      var _result$rows$ = result.rows[0],
          id = _result$rows$.id,
          is_admin = _result$rows$.is_admin;

      var token = _jsonwebtoken["default"].sign({
        _id: id,
        _email: result.rows[0].email,
        _isadmin: is_admin
      }, "hidelater");

      res.header('token', token).send({
        status: "success",
        data: {
          token: token,
          user_id: id,
          is_admin: is_admin
        }
      });
    });
  },
  signin: function signin(req, res) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password; // query the database

    _pool["default"].query('SELECT * FROM users WHERE email = ($1)', [email]).then(function (result) {
      if (result.rowCount !== 1) return res.status(400).send({
        status: "error",
        error: "invalid email or password"
      });
      if (password !== result.rows[0].password) return res.status(400).send({
        status: "error",
        error: "invalid email or password"
      });
      var _result$rows$2 = result.rows[0],
          id = _result$rows$2.id,
          is_admin = _result$rows$2.is_admin,
          _email = _result$rows$2.email;

      var token = _jsonwebtoken["default"].sign({
        _id: id,
        _email: _email,
        _isadmin: is_admin
      }, "hidelater");

      res.send({
        status: 200,
        data: {
          token: token,
          id: id,
          is_admin: is_admin
        }
      });
    });
  }
};
var _default = auth;
exports["default"] = _default;