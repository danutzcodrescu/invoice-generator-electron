import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { InvoiceTable } from '../components/invoices/InvoiceTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { SelectDates } from '../components/toolbox/SelectDates.component';
import { defaultDate } from '../components/utils/client';
import { useNotification } from '../context/notification.context';
import { Query } from '../generated/graphql';
import { DELETE_INVOICE } from '../graphql/mutations';
import { GET_INVOICES } from '../graphql/queries';
import { refetchCustom, refetchData } from '../utils/refetchData';

export function InvoiceTableContainer() {
  const { data, loading, refetch } = useQuery<Query>(GET_INVOICES, {
    variables: { startDate: defaultDate },
  });
  const { showNotificationFor } = useNotification();
  const [deleteInvoice] = useMutation(DELETE_INVOICE, {
    onCompleted: () => {
      showNotificationFor(5000, 'Invoice deleted succesfully');
    },
    refetchQueries: [
      {
        query: GET_INVOICES,
        variables: { startDate: defaultDate },
      },
    ],
  });
  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <SelectDates
        onChange={refetchData(refetch)}
        defaultValue={defaultDate}
        refetchCustom={refetchCustom(refetch)}
      />
      <InvoiceTable
        data={data.invoices}
        isLoading={loading}
        deleteInvoice={deleteInvoice}
      />
    </>
  );
}
