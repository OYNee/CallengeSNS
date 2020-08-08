import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      console.log(args);
      const { userid, bio, avatar } = args;
      const { user } = request;

      if (userid == "") {
        await prisma.updateUser({
          where: { id: user.id },
          data: { userid: user.username, bio: bio },
        });
        return true;
      } else {
        await prisma.updateUser({
          where: { id: user.id },
          data: { userid: userid, bio: bio },
        });
        return true;
      }
    },
  },
};
