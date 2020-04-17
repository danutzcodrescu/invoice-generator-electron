import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { InvoiceForm } from '../components/invoices/InvoiceForm.component';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { Loading } from '../components/toolbox/Loading.component';
import { useModalInvoice } from '../components/toolbox/pdf.hook';
import { defaultDate } from '../components/utils/client';
import { submitForm } from '../components/utils/editForm';
import { Invoice, Query } from '../generated/graphql';
import { GET_DISCOUNTS } from '../graphql/discounts/queries';
import { UPDATE_INVOICE } from '../graphql/mutations';
import { GET_INVOICE, GET_INVOICES, GET_VAT_RULES } from '../graphql/queries';

export function InvoiceEditContainer() {
  const { data, loading } = useQuery<Query>(GET_VAT_RULES);
  const { id } = useParams();
  const { goBack } = useHistory();
  const { data: invoiceData, loading: loadingInvoice } = useQuery<Query>(
    GET_INVOICE,
    {
      variables: { id },
    },
  );
  const { data: discountsData } = useQuery<Query>(GET_DISCOUNTS);
  const { isModalVisible, createPDF } = useModalInvoice(
    'Invoice succesfully updated',
  );
  const [updateInvoice] = useMutation(UPDATE_INVOICE, {
    onCompleted: (data: Invoice) => {
      createPDF(data);
      goBack();
    },
    refetchQueries: [
      {
        query: GET_INVOICES,
        variables: {
          startDate: defaultDate,
        },
      },
    ],
  });
  if (loading || loadingInvoice) return <Loading />;
  if (!data || !invoiceData) return <p></p>;

  return (
    <>
      <InvoiceForm
        title={`Edit invoice ${invoiceData.getInvoice.invoiceNumber}`}
        submitForm={submitForm(id!)}
        vat={data}
        type="Invoice"
        submitButtonText="Update invoice"
        createInvoice={updateInvoice}
        values={invoiceData.getInvoice}
        discounts={discountsData}
      ></InvoiceForm>
      <LoadingModal
        isOpen={isModalVisible}
        text="Updating invoice"
      ></LoadingModal>
    </>
  );
}
