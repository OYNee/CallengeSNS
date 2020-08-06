import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadChallenge: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log(user.id)
     
      const { caption, category, hashtags, 
        rel_challengers,pre_challegners,
        next_challengers, tag_challengers, 
        scope,files, audio, text, image  } = args;
      console.log(rel_persons)

      const post = await prisma.createPost({
        caption,
        category,
        user: { connect: { id: user.id } },
        scope: scope
      });
      //Relation_challenger에 관한 함수
      //여러명의 값이 들어갈 수 있기 때문에 forEach문으로 작성
      rel_challengers.forEach(
        async rel_challenger =>
        //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
        await prisma.updateUser({
          data:{
            relChallenger:{
              connect:{id:post.id}
            }
          },
          where: {username: rel_challenger}
        }),
        async rel_challenger=>
        await prisma.updatePost({
          data:{
            relChallenger:{
              connect:{username: rel_challenger}
            }
          },
          where:{id: post.id}
        })
      )
      pre_challegners.forEach(
        async pre_challegner =>
        //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
        await prisma.updateUser({
          data:{
            preChallenger:{
              connect:{id:post.id}
            }
          },
          where: {username: pre_challegner}
        }),
        async pre_challegner=>
        await prisma.updatePost({
          data:{
            preChallenger:{
              connect:{username: pre_challegner}
            }
          },
          where:{id: post.id}
        })
      )
      next_challengers.forEach(
        async next_challenger =>
        //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
        await prisma.updateUser({
          data:{
            nextChallenger:{
              connect:{id:post.id}
            }
          },
          where: {username: next_challenger}
        }),
        async next_challenger=>
        await prisma.updatePost({
          data:{
            nextChallenger:{
              connect:{username: next_challenger}
            }
          },
          where:{id: post.id}
        })
      )
      tag_challengers.forEach(
        async tag_challenger =>
        //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
        await prisma.updateUser({
          data:{
            tagChallenger:{
              connect:{id:post.id}
            }
          },
          where: {username: tag_challenger}
        }),
        async tag_challenger=>
        await prisma.updatePost({
          data:{
            tagChallenger:{
              connect:{username: tag_challenger}
            }
          },
          where:{id: post.id}
        })
      )
  
      hashtags.forEach(
        async hashtag =>
         await prisma.createHashtag({
           tag_name:hashtag,
           post: {
            connect: {
              id: post.id
            }
          }
        })
      ) 
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id
              }
            }
          })
      );
      return post;
    }
  }
};
