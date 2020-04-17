export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface Base {
  __typename?: 'Base';
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
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
  expenses: Array<Expense>;
  offers: Array<Offer>;
}

export interface ClientInvoicesArgs {
  endDate?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
}

export interface ClientExpensesArgs {
  endDate?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
}

export interface ClientOffersArgs {
  endDate?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
}

export interface ClientData {
  __typename?: 'ClientData';
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  vat?: Maybe<Scalars['String']>;
}

export interface ClientInput {
  clientId?: Maybe<Scalars['ID']>;
  clientData: Scalars['String'];
}

export interface CreateExpense {
  invoiceDate: Scalars['String'];
  invoiceNumber: Scalars['String'];
  vat: Scalars['Float'];
  amount: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
  clientName: Scalars['String'];
}

export interface Discount {
  __typename?: 'Discount';
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  name: Scalars['String'];
  percentage: Scalars['Float'];
}

export interface DiscountInsert {
  name?: Maybe<Scalars['String']>;
  percentage: Scalars['Float'];
}

export interface Event {
  __typename?: 'Event';
  id: Scalars['ID'];
  data: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
}

export interface Expense {
  __typename?: 'Expense';
  id: Scalars['ID'];
  invoiceNumber: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  client?: Maybe<Client>;
  clientName: Scalars['String'];
  vat: Scalars['Float'];
  amount: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  invoiceDate: Scalars['String'];
}

export interface ExpenseUpdate {
  id: Scalars['String'];
  invoiceDate: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  clientName: Scalars['String'];
  amount: Scalars['Float'];
  vat: Scalars['Float'];
  description?: Maybe<Scalars['String']>;
  invoiceNumber: Scalars['String'];
}

export interface Invoice {
  __typename?: 'Invoice';
  id: Scalars['ID'];
  invoiceNumber: Scalars['String'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  profile: Profile;
  client?: Maybe<Client>;
  vat: Scalars['Float'];
  vatRuleName: Scalars['String'];
  amount: Scalars['Float'];
  paid: Scalars['Boolean'];
  discount: Scalars['Float'];
  clientData: ClientData;
  profileData: ProfileData;
  items: Array<Item>;
  invoiceDate: Scalars['String'];
  paymentDeadline: Scalars['String'];
}

export interface InvoiceInput {
  invoiceDate: Scalars['String'];
  items: Scalars['String'];
  vat: Scalars['Float'];
  amount: Scalars['Float'];
  invoiceNumber: Scalars['String'];
  vatRuleName: Scalars['String'];
  paymentDeadline: Scalars['String'];
  discount: Scalars['Float'];
}

export interface InvoiceUpdate {
  id: Scalars['String'];
  invoiceDate: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  clientData: Scalars['String'];
  profileData: Scalars['String'];
  profileId?: Maybe<Scalars['String']>;
  items: Scalars['String'];
  amount: Scalars['Float'];
  vat: Scalars['Float'];
  vatRuleName: Scalars['String'];
  invoiceNumber: Scalars['String'];
  paymentDeadline: Scalars['String'];
  discount: Scalars['Float'];
}

export interface Item {
  __typename?: 'Item';
  name: Scalars['String'];
  value: Scalars['Float'];
  measurement?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
}

export interface Mutation {
  __typename?: 'Mutation';
  updateClient: Client;
  addClient: Client;
  deleteClient: Scalars['Boolean'];
  createExpense: Expense;
  deleteExpense: Scalars['Boolean'];
  updateExpense: Expense;
  createInvoice: Invoice;
  updateInvoice: Invoice;
  deleteInvoice: Scalars['Boolean'];
  toggleInvoiceStatus: Invoice;
  insertOffer: Offer;
  invoiceOffer: Invoice;
  deleteOffer: Scalars['Boolean'];
  updateOffer: Offer;
  updateProfile: Profile;
  addProfile: Profile;
  deleteProfile: Scalars['Boolean'];
  addService: Service;
  updateService: Service;
  deleteService: Scalars['Boolean'];
  addVatRule: VatRule;
  updateVatRule: VatRule;
  deleteVat: Scalars['Boolean'];
  addDiscount: Discount;
  updateDiscount: Discount;
  deleteDiscount: Scalars['Boolean'];
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

export interface MutationDeleteClientArgs {
  id: Scalars['ID'];
}

export interface MutationCreateExpenseArgs {
  expense: CreateExpense;
}

export interface MutationDeleteExpenseArgs {
  id: Scalars['ID'];
}

export interface MutationUpdateExpenseArgs {
  data: ExpenseUpdate;
}

export interface MutationCreateInvoiceArgs {
  invoiceData: InvoiceInput;
  profile: ProfileInput;
  client: ClientInput;
}

export interface MutationUpdateInvoiceArgs {
  data: InvoiceUpdate;
}

export interface MutationDeleteInvoiceArgs {
  id: Scalars['ID'];
}

export interface MutationToggleInvoiceStatusArgs {
  id: Scalars['ID'];
  status: Scalars['Boolean'];
}

export interface MutationInsertOfferArgs {
  objet: OfferInsert;
}

export interface MutationInvoiceOfferArgs {
  id: Scalars['ID'];
}

export interface MutationDeleteOfferArgs {
  id: Scalars['ID'];
}

export interface MutationUpdateOfferArgs {
  data: OfferUpdate;
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

export interface MutationDeleteProfileArgs {
  id: Scalars['ID'];
}

export interface MutationAddServiceArgs {
  cost?: Maybe<Scalars['Float']>;
  measurement?: Maybe<Scalars['String']>;
  name: Scalars['String'];
}

export interface MutationUpdateServiceArgs {
  data: ServiceUpdate;
  id: Scalars['ID'];
}

export interface MutationDeleteServiceArgs {
  id: Scalars['ID'];
}

export interface MutationAddVatRuleArgs {
  name?: Maybe<Scalars['String']>;
  percentage: Scalars['Float'];
}

export interface MutationUpdateVatRuleArgs {
  data: VatRuleUpdate;
  id: Scalars['ID'];
}

export interface MutationDeleteVatArgs {
  id: Scalars['ID'];
}

export interface MutationAddDiscountArgs {
  data: DiscountInsert;
}

export interface MutationUpdateDiscountArgs {
  data: DiscountInsert;
  id: Scalars['ID'];
}

export interface MutationDeleteDiscountArgs {
  id: Scalars['ID'];
}

export interface Offer {
  __typename?: 'Offer';
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  profile: Profile;
  client?: Maybe<Client>;
  vat: Scalars['Float'];
  vatRuleName: Scalars['String'];
  amount: Scalars['Float'];
  discount: Scalars['Float'];
  clientData: ClientData;
  profileData: ProfileData;
  items: Array<Item>;
  validUntil: Scalars['String'];
  invoiceDate: Scalars['String'];
}

export interface OfferInsert {
  invoiceDate: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  clientData: Scalars['String'];
  profileData: Scalars['String'];
  profileId: Scalars['String'];
  items: Scalars['String'];
  amount: Scalars['Float'];
  vat: Scalars['Float'];
  vatRuleName: Scalars['String'];
  validUntil: Scalars['String'];
  discount: Scalars['Float'];
}

export interface OfferUpdate {
  id: Scalars['String'];
  invoiceDate: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  clientData: Scalars['String'];
  profileData: Scalars['String'];
  profileId: Scalars['String'];
  items: Scalars['String'];
  amount: Scalars['Float'];
  vat: Scalars['Float'];
  vatRuleName: Scalars['String'];
  validUntil: Scalars['String'];
  discount: Scalars['Float'];
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

export interface ProfileData {
  __typename?: 'ProfileData';
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  address: Scalars['String'];
  vat?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  bankAccount?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
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
  expenses: Array<Expense>;
  getExpense: Expense;
  lastInvoiceNumber: Scalars['String'];
  invoices: Array<Invoice>;
  getInvoice: Invoice;
  offers: Array<Offer>;
  getOffer: Offer;
  profiles: Array<Profile>;
  profile: Profile;
  services: Array<Service>;
  vatRules: Array<VatRule>;
  discounts: Array<Discount>;
}

export interface QueryClientArgs {
  clientId: Scalars['ID'];
}

export interface QueryExpensesArgs {
  endDate?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
}

export interface QueryGetExpenseArgs {
  id: Scalars['ID'];
}

export interface QueryInvoicesArgs {
  endDate?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
}

export interface QueryGetInvoiceArgs {
  id: Scalars['ID'];
}

export interface QueryOffersArgs {
  endDate?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
}

export interface QueryGetOfferArgs {
  id: Scalars['ID'];
}

export interface QueryProfileArgs {
  profileId: Scalars['ID'];
}

export interface Service {
  __typename?: 'Service';
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  name: Scalars['String'];
  measurement?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
}

export interface ServiceUpdate {
  name?: Maybe<Scalars['String']>;
  measurement?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['Float']>;
}

export interface UpdateClientInput {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  vat?: Maybe<Scalars['String']>;
}

export interface UpdateProfileInput {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  vat?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  bankAccount?: Maybe<Scalars['String']>;
}

export interface VatRule {
  __typename?: 'VatRule';
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  name: Scalars['String'];
  percentage: Scalars['Float'];
}

export interface VatRuleUpdate {
  name?: Maybe<Scalars['String']>;
  percentage: Scalars['Float'];
}
