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

export const GET_PROFILES = gql`
  query GetProfiles {
    profiles {
      id
      firstName
      lastName
      company
      email
      address
      vat
      bankAccount
      phone
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

export const GET_INVOICES = gql`
  query GetInvoices {
    invoices {
      id
      client {
        id
        firstName
        lastName
        company
      }
      clientData
      vat
      amount
      invoiceDate
      invoiceNumber
    }
  }
`;

export const GET_CLIENT = gql`
  query GetClient($clientId: ID!) {
    client(clientId: $clientId) {
      id
      address
      company
      lastName
      firstName
      invoices {
        id
        invoiceDate
        invoiceNumber
        amount
        vat
      }
      expenses {
        id
        invoiceDate
        invoiceNumber
        amount
        vat
      }
      vat
      email
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      id
      address
      company
      lastName
      firstName
      phone
      vat
      email
      bankAccount
    }
  }
`;

export const GET_EXPENSES = gql`
  query GetExpenses {
    expenses {
      id
      clientName
      client {
        id
      }
      vat
      amount
      invoiceDate
      invoiceNumber
      description
    }
  }
`;
