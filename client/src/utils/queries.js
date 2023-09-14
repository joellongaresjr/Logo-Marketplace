import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query User {
    user {
      _id
      username
      email
      address
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          imageUrl
        }
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

export const QUERY_SINGLE_STORE = gql`
query getStore($_id: ID!) {
  getStore(_id: $_id) {
    _id
    name
  }
}`;

export const QUERY_STORES = gql`
query getStores {
  getStores {
    _id
    name
    location
    shopImageUrl
    description
  }
}`
