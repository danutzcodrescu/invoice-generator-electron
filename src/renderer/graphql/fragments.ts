import gql from 'graphql-tag';

export const profileFragment = gql`
  fragment ProfileFragment on Profile {
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
`;

export const clientFragment = gql`
  fragment ClientFragment on Client {
    id
    firstName
    lastName
    company
    email
    address
    vat
  }
`;

export const invoiceFragment = gql`
  fragment InvoiceFragment on Invoice {
    id
    vat
    amount
    invoiceDate
    invoiceNumber
    vatRuleName
    clientData {
      firstName
      lastName
      company
      address
      vat
    }
    vatRuleName
  }
`;

export const invoicingDetailsFragment = gql`
  fragment InvoicingDetails on Invoice {
    profileData {
      firstName
      lastName
      company
      address
      vat
      bankAccount
      email
      phone
    }
    items {
      measurement
      quantity
      value
      name
    }
  }
`;

export const expenseFragment = gql`
  fragment ExpenseFragment on Expense {
    id
    invoiceDate
    invoiceNumber
    amount
    vat
  }
`;
