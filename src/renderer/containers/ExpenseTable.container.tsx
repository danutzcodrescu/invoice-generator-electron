import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { ExpenseTable } from '../components/expenses/ExpenseTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { Query } from '../generated/graphql';
import { GET_EXPENSES } from '../graphql/queries';

interface Props {}

export function ExpenseTableContainer(props: Props) {
  const { data, loading } = useQuery<Query>(GET_EXPENSES);
  if (loading || !data) {
    return <Loading />;
  }
  return <ExpenseTable expenses={data!.expenses} />;
}
