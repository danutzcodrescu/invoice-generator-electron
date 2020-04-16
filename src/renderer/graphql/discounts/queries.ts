import gql from 'graphql-tag';
import { discountFragment } from './fragments';

export const GET_DISCOUNTS = gql`
  query GetDiscounts {
    discounts {
      ...DiscountFragment
    }
  }
  ${discountFragment}
`;
