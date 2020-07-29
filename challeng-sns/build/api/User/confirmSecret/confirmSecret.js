"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../../generated/prisma-client");

var _utils = require("../../../utils");

var _default = {
  Mutation: {
    confirmSecret: function () {
      var _confirmSecret = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, email, secret, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request;
                email = args.email, secret = args.secret;
                _context.next = 4;
                return _prismaClient.prisma.user({
                  email: email
                });

              case 4:
                user = _context.sent;

                if (!(user.loginSecret === secret)) {
                  _context.next = 11;
                  break;
                }

                _context.next = 8;
                return _prismaClient.prisma.updateUser({
                  where: {
                    id: user.id
                  },
                  data: {
                    loginSecret: ""
                  }
                });

              case 8:
                return _context.abrupt("return", (0, _utils.generateToken)(user.id));

              case 11:
                throw Error("Wrong email/secret combination");

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function confirmSecret(_x, _x2, _x3) {
        return _confirmSecret.apply(this, arguments);
      }

      return confirmSecret;
    }()
  }
};
exports["default"] = _default;