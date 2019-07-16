"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _trips = _interopRequireDefault(require("../controllers/trips"));

var _secure = _interopRequireDefault(require("../middleware/secure"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _secure["default"].protect, _trips["default"].createTrip);
router.get('/', _secure["default"].protect, _trips["default"].getTrips);
router.patch('/:tripId', _secure["default"].protect, _trips["default"].updateTrips);
var _default = router;
exports["default"] = _default;