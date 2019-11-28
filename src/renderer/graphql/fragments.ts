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
