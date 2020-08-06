import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    deleteAccount: async (_, args, { request, isAuthenticated }) => {
      const { passwd } = args;
      isAuthenticated(request);
      const { user } = request;

      console.log(user.id);
      console.log(passwd);
      const passwdMatch = bcrypt.compare(passwd, user.passwd);
      console.log(bcrypt.compare(passwd, user.passwd));

      if (!passwdMatch) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      console.log("asd");
      return prisma.deleteUser({
        where: { id: user.id },
      });
    },
  },
};
