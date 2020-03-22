import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { InvoiceTable } from '../components/invoices/InvoiceTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { SelectDates } from '../components/toolbox/SelectDates.component';
import { defaultDate } from '../components/utils/client';
import { Query } from '../generated/graphql';
import { GET_INVOICES } from '../graphql/queries';

export function InvoiceTableContainer() {
  const { data, loading, refetch } = useQuery<Query>(GET_INVOICES, {
    variables: { startDate: defaultDate },
  });
  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <SelectDates
        onChange={(e) => refetch({ startDate: e.target.value })}
        defaultValue={defaultDate}
      />
      <InvoiceTable data={data.invoices} isLoading={loading} />
    </>
  );
}
