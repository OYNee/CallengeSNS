import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!, $limit: Int!, $cur: Int!) {
    searchHashtag(term: $term, limit: $limit, cur: $cur) {
      id
      tag_name
    }
  }
`;