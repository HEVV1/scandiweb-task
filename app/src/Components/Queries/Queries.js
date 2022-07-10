import { gql } from '@apollo/client';

export const LOAD_CURRENCY_QUERY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const LOAD_PRODUCTS_QUERY = gql`
  query Event($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const LOAD_CATEGORIES_QUERY = gql`
  query {
    categories {
      name
    }
  }
`;