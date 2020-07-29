"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateJwt = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _prismaClient = require("../generated/prisma-client");

var jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

var verifyUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _prismaClient.prisma.user({
              id: payload.id
            });

          case 3:
            user = _context.sent;

            if (!(user !== null)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", done(null, user));

          case 8:
            return _context.abrupt("return", done(null, false));

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", done(_context.t0, false));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function verifyUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var authenticateJwt = function authenticateJwt(req, res, next) {
  return _passport["default"].authenticate("jwt", {
    sessions: false
  }, function (error, user) {
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);
};

exports.authenticateJwt = authenticateJwt;

_passport["default"].use(new _passportJwt.Strategy(jwtOptions, verifyUser));

_passport["default"].initialize();