import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!, $limit: Int!, $cur: Int!) {
    HashtagPost(tag_name: $term, limit: $limit, cur: $cur) {
      id
        location
        caption
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
    }
  }
`;