import gql from 'graphql-tag';

export const CREATE_CLIENT = gql`
  mutation AddClient(
    $firstName: String
    $lastName: String
    $email: String
    $company: String
    $address: String
    $vat: String
  ) {
    addClient(
      firstName: $firstName
      lastName: $lastName
      email: $email
      company: $company
      address: $address
      vat: $vat
    ) {
      id
      firstName
      lastName
      company
      address
      vat
    }
  }
`;
