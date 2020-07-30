"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../../../utils");

var _prismaClient = require("../../../../generated/prisma-client");

var _default = {
  Mutation: {
    requestSecret: function () {
      var _requestSecret = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args) {
        var email, loginSecret;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = args.email;
                loginSecret = (0, _utils.generateSecret)();
                _context.prev = 2;
                _context.next = 5;
                return (0, _utils.sendSecretMail)(email, loginSecret);

              case 5:
                _context.next = 7;
                return _prismaClient.prisma.updateUser({
                  data: {
                    loginSecret: loginSecret
                  },
                  where: {
                    email: email
                  }
                });

              case 7:
                return _context.abrupt("return", true);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                return _context.abrupt("return", false);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      function requestSecret(_x, _x2) {
        return _requestSecret.apply(this, arguments);
      }

      return requestSecret;
    }()
  }
};
exports["default"] = _default;