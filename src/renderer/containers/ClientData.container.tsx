import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ClientData } from '../components/client/ClientData.components';
import { LoadingModal } from '../components/invoices/LoadingModal.component';
import { Loading } from '../components/toolbox/Loading.component';
import { useModalInvoice } from '../components/toolbox/pdf.hook';
import { defaultDate } from '../components/utils/client';
import { Offer, Query } from '../generated/graphql';
import { INVOICE_OFFER } from '../graphql/mutations';
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
  function toInvoice(_, rowData: Offer | Offer[]) {
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
      ></ClientData>
      <LoadingModal
        isOpen={isModalVisible}
        text="Creating invoice"
      ></LoadingModal>
    </>
  );
}
