import { gql } from '@apollo/client';

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
  $username: String!,
  $email: String!,
  $password: String!,
  $address: String!
  ) {
    addUser(
      username: $username,
      email: $email,
      password: $password,
      address: $address
    ) {
    token
    user {
      _id
    }
  }
}
`;

export const CREATE_ORDER = gql`
mutation createOrder($products: [ID]!) {
  createOrder(products: $products) {
    purchaseDate
    products {
      _id
      name
      description
      price
      quantity
      imageUrl
      featured
    }
  }
}
`;




