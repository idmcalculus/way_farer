"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var secure = {
  protect: function protect(req, res, next) {
    var token = req.header('token');

    if (!token) {
      return res.status(401).send({
        status: 401,
        error: "Access denied, No token"
      });
    }

    try {
      var decoded = _jsonwebtoken["default"].verify(token, "hidelater");

      req.user = decoded;
      req.body.token = token;
      next();
    } catch (ex) {
      res.status(400).send({
        status: 400,
        error: "invalid token"
      });
    }
  }
};
var _default = secure;
exports["default"] = _default;