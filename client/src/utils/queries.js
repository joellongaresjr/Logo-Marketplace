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

export const QUERY_ITEM = gql`
  query GetProduct($_id: ID!) {
    getProduct(_id: $_id) {
      _id
      name
      description
      price
      stockQuantity
      imageUrl
      created_at
      featured
    }
  }
`;

export const QUERY_PRODUCTS_FUZZY = gql`
  query getProductsFuzzy($query: String!) {
    getProductsFuzzy(query: $query) {
      _id
      name
      imageUrl
      price
      description
      featured
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
      description
      featured
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
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

export const QUERY_PRODUCT_BY_CATEGORY = gql`
  query getProductsByCategory($_id: ID!) {
    getProductsByCategory(_id: $_id) {
      _id
      name
      description
      price
      stockQuantity
      imageUrl
      featured
    }
  }
`;

