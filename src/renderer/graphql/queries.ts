import gql from 'graphql-tag';
import {
  clientFragment,
  expenseFragment,
  invoiceFragment,
  invoicingDetailsFragment,
  offerFragment,
  profileFragment,
} from './fragments';

export const GET_VAT_RULES = gql`
  query GetVatRules {
    vatRules {
      id
      name
      percentage
    }
  }
`;

export const GET_SERVICES = gql`
  query GetServices {
    services {
      id
      name
      measurement
      cost
    }
  }
`;

export const GET_PROFILES = gql`
  query GetProfiles {
    profiles {
      ...ProfileFragment
    }
  }

  ${profileFragment}
`;

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      ...ClientFragment
    }
  }

  ${clientFragment}
`;

export const GET_INVOICES = gql`
  query GetInvoices($startDate: String!) {
    invoices(startDate: $startDate) {
      ...InvoiceFragment
      ...InvoicingDetails
      client {
        id
        firstName
        lastName
        company
      }
    }
  }
  ${invoiceFragment}
  ${invoicingDetailsFragment}
`;

export const GET_CLIENT = gql`
  query GetClient($clientId: ID!, $startDate: String) {
    client(clientId: $clientId) {
      ...ClientFragment
      invoices(startDate: $startDate) {
        ...InvoiceFragment
      }
      expenses(startDate: $startDate) {
        ...ExpenseFragment
      }
      offers(startDate: $startDate) {
        ...OfferFragment
      }
    }
  }
  ${clientFragment}
  ${invoiceFragment}
  ${expenseFragment}
  ${offerFragment}
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
      ...ExpenseFragment
      clientName
      client {
        id
      }
      description
    }
  }

  ${expenseFragment}
`;

export const GET_OFFERS = gql`
  query GetOffers($startDate: String!) {
    offers(startDate: $startDate) {
      ...OfferFragment
      client {
        id
        firstName
        lastName
        company
      }
    }
  }
  ${offerFragment}
`;
