import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!, $limit: Int!, $cur: Int!) {
    searchPost(term: $term, limit: $limit, cur: $cur) {
      files {
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term, limit: $limit, cur: $cur) {
      id
      avatar
      username
      isFollowing
      isSelf
      bio
    }
  }
`;