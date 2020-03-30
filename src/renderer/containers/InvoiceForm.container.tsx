/* eslint-disable @typescript-eslint/no-var-requires */
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { submitForm } from '../components/invoices/helpers';
import { InvoiceForm } from '../components/invoices/InvoiceForm.component';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { useModalInvoice } from '../components/toolbox/pdf.hook';
import { defaultDate } from '../components/utils/client';
import { Query } from '../generated/graphql';
import { CREATE_INVOICE } from '../graphql/mutations';
import { GET_INVOICES, GET_VAT_RULES } from '../graphql/queries';

export function InvoiceFormContainer() {
  const { data } = useQuery<Query>(GET_VAT_RULES);
  const { isModalVisible, createPDF } = useModalInvoice(
    'Invoice succesfully created',
  );
  const [createInvoice] = useMutation(CREATE_INVOICE, {
    onCompleted: createPDF,
    refetchQueries: [
      {
        query: GET_INVOICES,
        variables: {
          startDate: defaultDate,
        },
      },
    ],
  });
  return (
    <>
      <InvoiceForm
        vat={data}
        title="New invoice"
        createInvoice={createInvoice}
        type="Invoice"
        submitButtonText="Create invoice"
        submitForm={submitForm}
      />
      <LoadingModal
        isOpen={isModalVisible}
        text="Creating invoice"
      ></LoadingModal>
    </>
  );
}
