import { useMutation, useQuery } from '@apollo/react-hooks';
import { format } from 'date-fns';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { InvoiceForm } from '../components/invoices/InvoiceForm.component';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { Loading } from '../components/toolbox/Loading.component';
import { useModalInvoice } from '../components/toolbox/pdf.hook';
import { defaultDate } from '../components/utils/client';
import { submitFormOffer } from '../components/utils/editForm';
import { Offer, Query } from '../generated/graphql';
import { UPDATE_OFFER } from '../graphql/mutations';
import { GET_OFFER, GET_OFFERS, GET_VAT_RULES } from '../graphql/queries';

export function OfferEditContainer() {
  const { data, loading } = useQuery<Query>(GET_VAT_RULES);
  const { id } = useParams();
  const { goBack } = useHistory();
  const { data: invoiceData, loading: loadingInvoice } = useQuery<Query>(
    GET_OFFER,
    {
      variables: { id },
    },
  );
  const { isModalVisible, createPDF } = useModalInvoice(
    'Offer succesfully updated',
  );
  const [updateInvoice] = useMutation(UPDATE_OFFER, {
    onCompleted: (data: Offer) => {
      createPDF(data);
      goBack();
    },
    refetchQueries: [
      {
        query: GET_OFFERS,
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
        title={`Edit offer ${format(
          new Date(invoiceData.getOffer.invoiceDate),
          'dd-MM-yyyy',
        )} valid until ${format(
          new Date(invoiceData.getOffer.validUntil),
          'dd-MM-yyyy',
        )}`}
        submitForm={submitFormOffer(id!)}
        vat={data}
        type="Offer"
        submitButtonText="Update offer"
        createInvoice={updateInvoice}
        values={invoiceData.getOffer}
      ></InvoiceForm>
      <LoadingModal
        isOpen={isModalVisible}
        text="Updating offer"
      ></LoadingModal>
    </>
  );
}
