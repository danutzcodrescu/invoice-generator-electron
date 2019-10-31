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
}

export interface Event {
  __typename?: 'Event';
  id: Scalars['ID'];
  data: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
}

export interface Mutation {
  __typename?: 'Mutation';
  addClient: Client;
  addProfile: Profile;
  addVatRule: VatRule;
}

export interface MutationAddClientArgs {
  vat?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
}

export interface MutationAddProfileArgs {
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
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
}

export interface Query {
  __typename?: 'Query';
  clients: Array<Client>;
  events: Array<Event>;
  profiles: Array<Profile>;
  vatRules: Array<VatRule>;
}

export interface VatRule {
  __typename?: 'VatRule';
  id: Scalars['ID'];
  name: Scalars['String'];
  percentage: Scalars['Float'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
}
