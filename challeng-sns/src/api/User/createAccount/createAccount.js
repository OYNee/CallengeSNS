import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs"
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
      const hashedPassword = await bcrypt.hash(passwd, 5);
      console.log(hashedPassword)
      await prisma.createUser({
        username,
        userid,
        passwd: hashedPassword,
        email,
        bio
      });
      return true;
    }
  }
};
