import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, userid, passwd,  bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            username
          },
          { email },
          {userid}
        ]
      });
      if (exists) {
        throw Error("This username / email is already taken");
      }
      await prisma.createUser({
        username,
        userid,
        passwd,
        email,
        bio
      });
      return true;
    }
  }
};
