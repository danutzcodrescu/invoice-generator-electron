import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { ExpenseTable } from '../components/expenses/ExpenseTable.component';
import { Query } from '../generated/graphql';
import { GET_EXPENSES } from '../graphql/queries';

interface Props {}

export function ExpenseTableContainer(props: Props) {
  const { data, loading } = useQuery<Query>(GET_EXPENSES);
  if (loading || !data) {
    return <h1>loading</h1>;
  }
  return <ExpenseTable expenses={data!.expenses} />;
}
