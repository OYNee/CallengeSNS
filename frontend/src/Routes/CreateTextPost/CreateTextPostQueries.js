import { gql } from "apollo-boost";

export const FOLLOW = gql`
  query follow($id: String!, $limit: Int!, $cur: Int!) {
    followingUser(id: $id, limit: $limit, cur: $cur) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;
// 캡션, scope 필수 아니게 고치기
export const UPLOAD = gql`
  mutation uploadChallenge(
    $caption: String!
    $category: String!
    $rel_challengers: [String!]
    $pre_challengers: [String!]
    $next_challengers: [String!]
    $tag_challengers: [String!]
    $files: [String!]!
    $textContent: String
  ) {
    uploadChallenge(
      caption: $caption
      category: $category
      rel_challengers: $rel_challengers
      pre_challengers: $pre_challengers
      next_challengers: $next_challengers
      tag_challengers: $tag_challengers
      files: $files
      textContent: $textContent
    ) {
      id
      caption
    }
  }
`;

//location -> 추후 그룹 포스트 아이디로
