"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../../generated/prisma-client");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _default = {
  Mutation: {
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args) {
        var email, passwd, user, passwdMatch, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = args.email, passwd = args.passwd; //console.log(email, passwd)

                _context.next = 3;
                return _prismaClient.prisma.user({
                  email: email
                });

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                throw new Error("유저가 없습니다.");

              case 6:
                console.log(user.passwd);
                console.log(args.passwd);
                _context.next = 10;
                return _bcryptjs["default"].compare(args.passwd, user.passwd);

              case 10:
                passwdMatch = _context.sent;

                if (passwdMatch) {
                  _context.next = 13;
                  break;
                }

                throw new Error("비밀번호가 틀립니다.");

              case 13:
                console.log(process.env.JWT_SECRET);
                token = _jsonwebtoken["default"].sign({
                  id: user.id
                }, process.env.JWT_SECRET);
                console.log(token);
                return _context.abrupt("return", token);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }
};
exports["default"] = _default;