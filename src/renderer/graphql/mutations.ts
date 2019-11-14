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

export const CREATE_VAT_RULE = gql`
  mutation CreateVatRule($name: String, $vat: Float!) {
    addVatRule(percentage: $vat, name: $name) {
      id
    }
  }
`;

export const CREATE_PROFILE = gql`
  mutation AddProfile(
    $firstName: String
    $lastName: String
    $email: String
    $company: String
    $address: String
    $vat: String
  ) {
    addProfile(
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

export const CREATE_INVOICE = gql`
  mutation createInvoice(
    $clientData: ClientInput!
    $profileData: ProfileInput!
    $invoiceData: InvoiceInput!
  ) {
    createInvoice(
      invoiceData: $invoiceData
      profile: $profileData
      client: $clientData
    ) {
      id
      invoiceDate
      clientData
      profileData
      vat
      amount
      items
      invoiceNumber
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($clientId: ID!, $clientData: UpdateClientInput!) {
    updateClient(clientData: $clientData, id: $clientId) {
      id
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profileId: ID!, $profileData: UpdateProfileInput!) {
    updateProfile(profileData: $profileData, id: $profileId) {
      id
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($expense: CreateExpense!) {
    createExpense(expense: $expense) {
      id
    }
  }
`;
