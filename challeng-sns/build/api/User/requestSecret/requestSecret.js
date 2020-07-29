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
      var _requestSecret = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, email, loginSecret;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request;
                email = args.email;
                console.log(email);
                loginSecret = (0, _utils.generateSecret)();
                _context.prev = 4;
                _context.next = 7;
                return (0, _utils.sendSecretMail)(email, loginSecret);

              case 7:
                _context.next = 9;
                return _prismaClient.prisma.updateUser({
                  data: {
                    loginSecret: loginSecret
                  },
                  where: {
                    email: email
                  }
                });

              case 9:
                return _context.abrupt("return", true);

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", false);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 12]]);
      }));

      function requestSecret(_x, _x2, _x3) {
        return _requestSecret.apply(this, arguments);
      }

      return requestSecret;
    }()
  }
};
exports["default"] = _default;