import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { OffersTable } from '../components/offer/OfferTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { useModalInvoice } from '../components/toolbox/pdf.hook';
import { SelectDates } from '../components/toolbox/SelectDates.component';
import { defaultDate } from '../components/utils/client';
import { useNotification } from '../context/notification.context';
import { Offer, Query } from '../generated/graphql';
import { DELETE_OFFER, INVOICE_OFFER } from '../graphql/mutations';
import { GET_OFFERS } from '../graphql/queries';
import { refetchCustom, refetchData } from '../utils/refetchData';

export function OfferTableContainer() {
  const { data, loading, refetch } = useQuery<Query>(GET_OFFERS, {
    variables: { startDate: defaultDate },
  });
  const { createPDF, isModalVisible } = useModalInvoice(
    'Invoice succesfully created',
  );
  const [invoiceOffer] = useMutation(INVOICE_OFFER, { onCompleted: createPDF });
  const { showNotificationFor } = useNotification();
  const [deleteOffer] = useMutation(DELETE_OFFER, {
    onCompleted: () => {
      showNotificationFor(5000, 'Offer deleted succesfully');
    },
    refetchQueries: [
      {
        query: GET_OFFERS,
        variables: { startDate: defaultDate },
      },
    ],
  });
  if (!data) {
    return <Loading />;
  }

  function toInvoice(_: any, rowData: Offer | Offer[]) {
    invoiceOffer({
      variables: {
        id: (rowData as Offer).id,
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
  }
  return (
    <>
      <SelectDates
        onChange={refetchData(refetch)}
        defaultValue={defaultDate}
        refetchCustom={refetchCustom(refetch)}
      />
      <OffersTable
        data={data.offers}
        isLoading={loading}
        invoiceOffer={toInvoice}
        deleteOffer={deleteOffer}
      />
      <LoadingModal
        isOpen={isModalVisible}
        text="Creating invoice"
      ></LoadingModal>
    </>
  );
}
