import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      console.log(args);
      const { nickname, bio, avatar } = args;
      const { user } = request;

      if (nickname == "") {
        await prisma.updateUser({
          where: { id: user.id },
          data: { nickname: user.username, bio: bio },
        });
        return true;
      } else {
        await prisma.updateUser({
          where: { id: user.id },
          data: { nickname: nickname, bio: bio },
        });
        return true;
      }
    },
  },
};
