import { gql } from "apollo-boost";

export const FIND_USER = gql`
  query seeUser($user: String!) {
    seeUser(id: $postId)
  }
`;
export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        username
      }
    }
  }
`;
