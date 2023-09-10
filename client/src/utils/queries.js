import { gql } from '@apollo/client';

export const QUERY_GET_PRODUCTS = gql`
{
  getProducts {
    _id
    name
    description
    price
    stockQuantity
    imageUrl
    category {
      name
    }
  }
}
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }`