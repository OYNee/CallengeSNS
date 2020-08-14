import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    preChallenge: async (_, args, { request, isAuthenticated })  =>{
        isAuthenticated(request);
        const {user} = request;
        const {nextPost} = args;
        const post = await prisma.$exists.post({user:{id: user.id}})
        if(post){
            return prisma.updatePost({
                data:{prePosts:nextPost},
                where:{id:user.id}
            })
        }else{
            throw Error("잘못된 요청입니다")
        }
        
    }
  }
};