import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { InvoiceForm } from '../components/invoices/InvoiceForm.component';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { submitOffer } from '../components/offer/offer.helpers';
import { useModalInvoice } from '../components/toolbox/pdf.hook';
import { defaultDate } from '../components/utils/client';
import { Query } from '../generated/graphql';
import { CREATE_OFFER } from '../graphql/mutations';
import { GET_OFFERS, GET_VAT_RULES } from '../graphql/queries';

export function OfferFormContainer() {
  const { data } = useQuery<Query>(GET_VAT_RULES);
  const { createPDF, isModalVisible } = useModalInvoice(
    'Offer succesfully created',
  );
  const [createInvoice] = useMutation(CREATE_OFFER, {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onCompleted: createPDF,
    refetchQueries: [
      { query: GET_OFFERS, variables: { startDate: defaultDate } },
    ],
  });
  return (
    <>
      <InvoiceForm
        vat={data}
        title="New offer"
        createInvoice={createInvoice}
        submitButtonText="Create offer"
        type="Offer"
        submitForm={submitOffer}
      />
      {/* TODO mock in storybook  */}
      <LoadingModal
        isOpen={isModalVisible}
        text="Creating offer"
      ></LoadingModal>
    </>
  );
}
