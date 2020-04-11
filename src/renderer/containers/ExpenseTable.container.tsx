import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { ExpenseTable } from '../components/expenses/ExpenseTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { SelectDates } from '../components/toolbox/SelectDates.component';
import { defaultDate } from '../components/utils/client';
import { useNotification } from '../context/notification.context';
import { Query } from '../generated/graphql';
import { DELETE_EXPENSE } from '../graphql/mutations';
import { GET_EXPENSES } from '../graphql/queries';
import { refetchCustom, refetchData } from '../utils/refetchData';

interface Props {}

export function ExpenseTableContainer(props: Props) {
  const { data, loading, refetch } = useQuery<Query>(GET_EXPENSES, {
    variables: { startDate: defaultDate },
  });
  const { showNotificationFor } = useNotification();
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    onCompleted: () => {
      showNotificationFor(5000, 'Expense deleted succesfully');
    },
    refetchQueries: [
      {
        query: GET_EXPENSES,
        variables: { startDate: defaultDate },
      },
    ],
  });
  if (loading || !data) {
    return <Loading />;
  }
  return (
    <>
      <SelectDates
        onChange={refetchData(refetch)}
        defaultValue={defaultDate}
        refetchCustom={refetchCustom(refetch)}
      />
      <ExpenseTable expenses={data!.expenses} deleteExpense={deleteExpense} />
    </>
  );
}
