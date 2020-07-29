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
  Mutation: {
    createAccount: function () {
      var _createAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args) {
        var username, email, _args$firstName, firstName, _args$lastName, lastName, _args$bio, bio, user;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = args.username, email = args.email, _args$firstName = args.firstName, firstName = _args$firstName === void 0 ? "" : _args$firstName, _args$lastName = args.lastName, lastName = _args$lastName === void 0 ? "" : _args$lastName, _args$bio = args.bio, bio = _args$bio === void 0 ? "" : _args$bio;
                _context.next = 3;
                return _prismaClient.prisma.createUser({
                  username: username,
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  bio: bio
                });

              case 3:
                user = _context.sent;
                return _context.abrupt("return", user);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
  }
};
exports["default"] = _default;