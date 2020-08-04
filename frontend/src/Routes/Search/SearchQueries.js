import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!, $limit: Int!) {
    searchPost(term: $term, limit: $limit) {
      files {
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term, limit: $limit) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;