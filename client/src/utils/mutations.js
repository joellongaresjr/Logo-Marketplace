import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $address: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      address: $address
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
    purchaseDate
    products {
      name
      price
      description
      purchaseQuantity
      _id
      imageUrl
      category {
        name
      }
      }
    }
  }
`;
