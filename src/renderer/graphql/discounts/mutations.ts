import gql from 'graphql-tag';
import { discountFragment } from './fragments';

export const DELETE_DISCOUNT = gql`
  mutation DELETE_DISCOUNT($id: ID!) {
    deleteDiscount(id: $id)
  }
`;
export const ADD_DISCOUNT = gql`
  mutation ADD_DISCOUNT($data: DiscountInsert!) {
    addDiscount(data: $data) {
      ...DiscountFragment
    }
  }
  ${discountFragment}
`;
export const UPDATE_DISCOUNT = gql`
  mutation UPDATE_DISCOUNT($id: ID!, $data: DiscountInsert!) {
    updateDiscount(id: $id, data: $data) {
      ...DiscountFragment
    }
  }
  ${discountFragment}
`;
