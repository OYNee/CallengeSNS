"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../../generated/prisma-client");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _default = {
  Mutation: {
    createAccount: function () {
      var _createAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args) {
        var username, email, userid, passwd, _args$bio, bio, exists, hashedPassword;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = args.username, email = args.email, userid = args.userid, passwd = args.passwd, _args$bio = args.bio, bio = _args$bio === void 0 ? "" : _args$bio;
                _context.next = 3;
                return _prismaClient.prisma.$exists.user({
                  OR: [{
                    email: email
                  }, {
                    userid: userid
                  }]
                });

              case 3:
                exists = _context.sent;

                if (!exists) {
                  _context.next = 6;
                  break;
                }

                throw Error("This userid / email is already taken");

              case 6:
                _context.next = 8;
                return _bcryptjs["default"].hash(passwd, 5);

              case 8:
                hashedPassword = _context.sent;
                console.log(hashedPassword);
                _context.next = 12;
                return _prismaClient.prisma.createUser({
                  username: username,
                  userid: userid,
                  passwd: hashedPassword,
                  email: email,
                  bio: bio
                });

              case 12:
                return _context.abrupt("return", true);

              case 13:
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