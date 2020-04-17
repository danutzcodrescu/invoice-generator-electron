import gql from 'graphql-tag';

export const discountFragment = gql`
  fragment DiscountFragment on Discount {
    id
    name
    percentage
  }
`;
