import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_PRODUCTS_FUZZY = gql`
  query getProductsFuzzy($query: String!) {
    getProductsFuzzy(query: $query) {
      _id
      name
    }
  }
`;

export const QUERY_PRODUCTS_PAGINATED = gql`
  query getProducts($limit: Int!, $offset: Int!) {
    getProducts(limit: $limit, offset: $offset) {
      _id
      name
      imageUrl
      price
    }
  }
`;

export const QUERY_CATEGORIES = gql`
query getCategories {
  getCategories {
    _id
    name
  }
}
`;
