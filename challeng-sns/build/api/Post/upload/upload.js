"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../../generated/prisma-client");

//파일 업로드를 위해서 로그인이 필수이므로 isAuthenticated를 통해 로그인을 확인
var _default = {
  Mutation: {
    upload: function () {
      var _upload = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, args, _ref) {
        var request, isAuthenticated, user, caption, files, post;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                user = request.user;
                caption = args.caption, files = args.files;
                _context2.next = 6;
                return _prismaClient.prisma.createPost({
                  caption: caption,
                  user: {
                    connect: {
                      id: user.id
                    }
                  }
                });

              case 6:
                post = _context2.sent;
                files.forEach( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _prismaClient.prisma.createFile({
                              url: file,
                              post: {
                                connect: {
                                  id: post.id
                                }
                              }
                            });

                          case 2:
                            return _context.abrupt("return", _context.sent);

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x4) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                return _context2.abrupt("return", post);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function upload(_x, _x2, _x3) {
        return _upload.apply(this, arguments);
      }

      return upload;
    }()
  }
};
exports["default"] = _default;