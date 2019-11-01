import gql from 'graphql-tag';

export const GET_VAT_RULES = gql`
  query GetVatRules {
    vatRules {
      id
      name
      percentage
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfiles {
    profiles {
      id
      firstName
      lastName
      company
      email
      address
      vat
    }
  }
`;

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      firstName
      lastName
      company
      email
      address
      vat
    }
  }
`;
