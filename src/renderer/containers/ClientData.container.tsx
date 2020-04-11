import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ClientData } from '../components/client/ClientData.components';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { Loading } from '../components/toolbox/Loading.component';
import { useModalInvoice } from '../components/toolbox/pdf.hook';
import { defaultDate } from '../components/utils/client';
import { useNotification } from '../context/notification.context';
import { Offer, Query } from '../generated/graphql';
import {
  DELETE_EXPENSE,
  DELETE_INVOICE,
  DELETE_OFFER,
  INVOICE_OFFER,
} from '../graphql/mutations';
import { GET_CLIENT } from '../graphql/queries';

interface Props extends RouteComponentProps<{ clientId: string }> {}

export function ClientDataContainer(props: Props) {
  const { createPDF, isModalVisible } = useModalInvoice(
    'Invoice succesfully created',
  );
  const { data, loading, refetch } = useQuery<Query>(GET_CLIENT, {
    variables: {
      clientId: props.match.params.clientId,
      startDate: defaultDate,
    },
  });
  const [invoiceOffer] = useMutation(INVOICE_OFFER, { onCompleted: createPDF });
  const { showNotificationFor } = useNotification();
  const [deleteOffer] = useMutation(DELETE_OFFER, {
    onCompleted: () => {
      showNotificationFor(5000, 'Offer deleted succesfully');
    },
    refetchQueries: [
      {
        query: GET_CLIENT,
        variables: {
          clientId: props.match.params.clientId,
          startDate: defaultDate,
        },
      },
    ],
  });
  const [deleteInvoice] = useMutation(DELETE_INVOICE, {
    onCompleted: () => {
      showNotificationFor(5000, 'Invoice deleted succesfully');
    },
    refetchQueries: [
      {
        query: GET_CLIENT,
        variables: {
          clientId: props.match.params.clientId,
          startDate: defaultDate,
        },
      },
    ],
  });
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    onCompleted: () => {
      showNotificationFor(5000, 'Expense deleted succesfully');
    },
    refetchQueries: [
      {
        query: GET_CLIENT,
        variables: {
          clientId: props.match.params.clientId,
          startDate: defaultDate,
        },
      },
    ],
  });
  function toInvoice(_: any, rowData: Offer | Offer[]) {
    invoiceOffer({
      variables: {
        id: (rowData as Offer).id,
      },
      refetchQueries: [
        {
          query: GET_CLIENT,
          variables: {
            startDate: defaultDate,
            clientId: props.match.params.clientId,
          },
        },
      ],
    });
  }
  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <ClientData
        client={data!.client}
        isLoading={loading || !data}
        refetch={refetch}
        invoiceOffer={toInvoice}
        deleteOffer={deleteOffer}
        deleteInvoice={deleteInvoice}
        deleteExpense={deleteExpense}
      ></ClientData>
      <LoadingModal
        isOpen={isModalVisible}
        text="Creating invoice"
      ></LoadingModal>
    </>
  );
}
