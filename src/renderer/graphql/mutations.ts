import gql from 'graphql-tag';
import {
  clientFragment,
  invoiceFragment,
  invoicingDetailsFragment,
  offerFragment,
  profileFragment,
} from './fragments';

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
      ...ClientFragment
    }
  }

  ${clientFragment}
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
      ...ProfileFragment
    }
  }

  ${profileFragment}
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
      ...InvoiceFragment
      ...InvoicingDetails
    }
  }
  ${invoiceFragment}
  ${invoicingDetailsFragment}
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

export const UPDATE_VAT = gql`
  mutation UpdateVat($data: VatRuleUpdate!, $id: ID!) {
    updateVatRule(data: $data, id: $id) {
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

export const CREATE_SERVICE = gql`
  mutation CreateService($measurement: String, $name: String!, $cost: Float) {
    addService(measurement: $measurement, name: $name, cost: $cost) {
      id
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UPDATE_SERVICE($id: ID!, $data: ServiceUpdate!) {
    updateService(id: $id, data: $data) {
      id
    }
  }
`;

export const CREATE_OFFER = gql`
  mutation CREATE_OFFER($object: OfferInsert!) {
    insertOffer(objet: $object) {
      ...OfferFragment
    }
  }
  ${offerFragment}
`;

export const INVOICE_OFFER = gql`
  mutation INVOICE_OFFER($id: ID!) {
    invoiceOffer(id: $id) {
      ...InvoiceFragment
      ...InvoicingDetails
    }
  }
  ${invoiceFragment}
  ${invoicingDetailsFragment}
`;

export const DELETE_PROFILE = gql`
  mutation DELETE_PROFILE($id: ID!) {
    deleteProfile(id: $id)
  }
`;
export const DELETE_INVOICE = gql`
  mutation DELETE_INVOICE($id: ID!) {
    deleteInvoice(id: $id)
  }
`;
export const DELETE_OFFER = gql`
  mutation DELETE_OFFER($id: ID!) {
    deleteOffer(id: $id)
  }
`;
export const DELETE_EXPENSE = gql`
  mutation DELETE_EXPENSE($id: ID!) {
    deleteExpense(id: $id)
  }
`;
export const DELETE_CLIENT = gql`
  mutation DELETE_CLIENT($id: ID!) {
    deleteClient(id: $id)
  }
`;
export const DELETE_VAT = gql`
  mutation DELETE_VAT($id: ID!) {
    deleteVat(id: $id)
  }
`;

export const DELETE_SERVICE = gql`
  mutation DELETE_SERVICE($id: ID!) {
    deleteService(id: $id)
  }
`;
