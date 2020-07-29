"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../../generated/prisma-client");

var _default = {
  Query: {
    sayHello: function () {
      var _sayHello = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = console;
                _context.next = 3;
                return _prismaClient.prisma.users();

              case 3:
                _context.t1 = _context.sent;

                _context.t0.log.call(_context.t0, _context.t1);

                return _context.abrupt("return", "HELLO");

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function sayHello() {
        return _sayHello.apply(this, arguments);
      }

      return sayHello;
    }()
  }
};
exports["default"] = _default;