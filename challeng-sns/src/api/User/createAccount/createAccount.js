import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs"
export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, nickname, passwd,  bio = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [
         
          { email },
          {nickname}
        ]
      });
      if (exists) {
        throw Error("This nickname / email is already taken");
      }
      const hashedPassword = await bcrypt.hash(passwd, 5);
      console.log(hashedPassword)
      await prisma.createUser({
        username,
        nickname,
        passwd: hashedPassword,
        email,
        bio
      });
      return true;
    }
  }
};
