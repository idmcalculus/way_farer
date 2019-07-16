"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bookings = _interopRequireDefault(require("../controllers/bookings"));

var _secure = _interopRequireDefault(require("../middleware/secure"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _secure["default"].protect, _bookings["default"].createBooking);
router.get('/', _secure["default"].protect, _bookings["default"].getBookings);
router["delete"]('/:bookingId', _secure["default"].protect, _bookings["default"].deleteBookings);
var _default = router;
exports["default"] = _default;