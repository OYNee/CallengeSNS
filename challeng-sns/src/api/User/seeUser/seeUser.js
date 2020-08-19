import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { email } = args;
      console.log(email)
      console.log(prisma.user({ email }))
      return prisma.user({ email });
    }
  }
};
