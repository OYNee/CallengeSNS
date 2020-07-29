"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROOM_FRAGMENT = exports.FULL_POST_FRAGMENT = exports.MESSAGE_FRAGMENT = exports.FILE_FRAGMENT = exports.COMMENT_FRAGMENT = exports.USER_FRAGMENT = void 0;
var USER_FRAGMENT = "\n    id\n    username\n    avatar\n";
exports.USER_FRAGMENT = USER_FRAGMENT;
var COMMENT_FRAGMENT = "\n    id\n    text\n    user {\n        ".concat(USER_FRAGMENT, "\n    }\n");
exports.COMMENT_FRAGMENT = COMMENT_FRAGMENT;
var FILE_FRAGMENT = "\n    id\n    url\n";
exports.FILE_FRAGMENT = FILE_FRAGMENT;
var MESSAGE_FRAGMENT = "\n    id\n    text\n    to {\n        ".concat(USER_FRAGMENT, "\n    }\n    from {\n        ").concat(USER_FRAGMENT, "\n    }\n");
exports.MESSAGE_FRAGMENT = MESSAGE_FRAGMENT;
var FULL_POST_FRAGMENT = "\n    fragment PostParts on Post{\n        id\n        location\n        caption\n        files {\n            ".concat(FILE_FRAGMENT, "\n        }\n        comments {\n            ").concat(COMMENT_FRAGMENT, "\n        }\n        user {\n            ").concat(USER_FRAGMENT, "\n        }\n    }\n");
exports.FULL_POST_FRAGMENT = FULL_POST_FRAGMENT;
var ROOM_FRAGMENT = "\n    fragment RoomParts on Room {\n        id\n        participants {\n            ".concat(USER_FRAGMENT, "\n        }\n        messages { \n            ").concat(MESSAGE_FRAGMENT, "\n        }\n    }\n");
exports.ROOM_FRAGMENT = ROOM_FRAGMENT;