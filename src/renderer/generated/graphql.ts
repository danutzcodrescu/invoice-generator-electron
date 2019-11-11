export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface Client {
  __typename?: 'Client';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  vat?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  invoices: Array<Invoice>;
}

export interface ClientInput {
  clientId?: Maybe<Scalars['ID']>;
  clientData: Scalars['String'];
}

export interface Event {
  __typename?: 'Event';
  id: Scalars['ID'];
  data: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
}

export interface Invoice {
  __typename?: 'Invoice';
  id: Scalars['ID'];
  invoiceDate: Scalars['String'];
  invoiceNumber: Scalars['String'];
  bankAccount?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  profile: Profile;
  profileData: Scalars['String'];
  client?: Maybe<Client>;
  clientData: Scalars['String'];
  items: Scalars['String'];
  vat: Scalars['Float'];
  amount: Scalars['Float'];
}

export interface InvoiceInput {
  invoiceDate: Scalars['String'];
  items: Scalars['String'];
  vat: Scalars['Float'];
  amount: Scalars['Float'];
  invoiceNumber: Scalars['String'];
}

export interface Mutation {
  __typename?: 'Mutation';
  updateClient: Client;
  addClient: Client;
  createInvoice: Invoice;
  updateProfile: Profile;
  addProfile: Profile;
  addVatRule: VatRule;
}

export interface MutationUpdateClientArgs {
  clientData: UpdateClientInput;
  id: Scalars['ID'];
}

export interface MutationAddClientArgs {
  vat?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
}

export interface MutationCreateInvoiceArgs {
  invoiceData: InvoiceInput;
  profile: ProfileInput;
  client: ClientInput;
}

export interface MutationUpdateProfileArgs {
  profileData: UpdateProfileInput;
  id: Scalars['ID'];
}

export interface MutationAddProfileArgs {
  phone?: Maybe<Scalars['String']>;
  bankAccount?: Maybe<Scalars['String']>;
  vat?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
}

export interface MutationAddVatRuleArgs {
  name?: Maybe<Scalars['String']>;
  percentage: Scalars['Float'];
}

export interface Profile {
  __typename?: 'Profile';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  vat?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  bankAccount?: Maybe<Scalars['String']>;
  invoices: Array<Invoice>;
}

export interface ProfileInput {
  profileId: Scalars['ID'];
  profileData: Scalars['String'];
}

export interface Query {
  __typename?: 'Query';
  clients: Array<Client>;
  client: Client;
  events: Array<Event>;
  invoices: Array<Invoice>;
  profiles: Array<Profile>;
  profile: Profile;
  vatRules: Array<VatRule>;
}

export interface QueryClientArgs {
  clientId: Scalars['ID'];
}

export interface QueryProfileArgs {
  profileId: Scalars['ID'];
}

export interface UpdateClientInput {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  company: Scalars['String'];
  email: Scalars['String'];
  address: Scalars['String'];
  vat: Scalars['String'];
}

export interface UpdateProfileInput {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  company: Scalars['String'];
  email: Scalars['String'];
  address: Scalars['String'];
  vat: Scalars['String'];
  phone: Scalars['String'];
  bankAccount: Scalars['String'];
}

export interface VatRule {
  __typename?: 'VatRule';
  id: Scalars['ID'];
  name: Scalars['String'];
  percentage: Scalars['Float'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
}
