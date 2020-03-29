import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { OffersTable } from '../components/offer/OfferTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { SelectDates } from '../components/toolbox/SelectDates.component';
import { defaultDate } from '../components/utils/client';
import { Query } from '../generated/graphql';
import { GET_OFFERS } from '../graphql/queries';

export function OfferTableContainer() {
  const { data, loading, refetch } = useQuery<Query>(GET_OFFERS, {
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
      <OffersTable data={data.offers} isLoading={loading} />
    </>
  );
}
