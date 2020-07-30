"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaClient = require("../../../generated/prisma-client");

var _default = {
  Post: {
    files: function files(_ref) {
      var id = _ref.id;
      return _prismaClient.prisma.post({
        id: id
      }).files();
    },
    comments: function comments(_ref2) {
      var id = _ref2.id;
      return _prismaClient.prisma.post({
        id: id
      }).comments();
    },
    user: function user(_ref3) {
      var id = _ref3.id;
      return _prismaClient.prisma.post({
        id: id
      }).user();
    },
    likes: function likes(_ref4) {
      var id = _ref4.id;
      return _prismaClient.prisma.post({
        id: id
      }).likes();
    },
    isLiked: function isLiked(parent, _, _ref5) {
      var request = _ref5.request;
      var user = request.user;
      var id = parent.id;
      return _prismaClient.prisma.$exists.like({
        AND: [{
          user: {
            id: user.id
          }
        }, {
          post: {
            id: id
          }
        }]
      });
    },
    likeCount: function likeCount(parent) {
      return _prismaClient.prisma.likesConnection({
        where: {
          post: {
            id: parent.id
          }
        }
      }).aggregate().count();
    },
    commentCount: function commentCount(parent) {
      return _prismaClient.prisma.commentsConnection({
        where: {
          post: {
            id: parent.id
          }
        }
      }).aggregate().count();
    }
  }
};
exports["default"] = _default;