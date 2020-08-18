import { gql } from "apollo-boost";

export const FEED_QUERY = gql`
  query seeFeed($cur:Int, $limit:Int)
   {
    seeFeed(cur:$cur,limit:$limit){
      id
      location
      caption
      category
      textContent
      hashtags {
        id
        tag_name
      }
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
      nextPostCount
        prePostCount
        nextPosts{
          user{
          id
          avatar
          username
          isFollowing
          isSelf
          bio}
        }
        prePosts{
          user{
          id
          avatar
          username
          isFollowing
          isSelf
          bio}
        }
    }
  }
`;