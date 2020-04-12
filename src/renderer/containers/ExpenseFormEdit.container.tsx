import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ExpenseForm } from '../components/expenses/ExpenseForm.component';
import { Loading } from '../components/toolbox/Loading.component';
import { useNotification } from '../context/notification.context';
import { Query } from '../generated/graphql';
import { UPDATE_EXPENSE } from '../graphql/mutations';
import { GET_EXPENSE } from '../graphql/queries';

interface Props extends RouteComponentProps<{ id: string }> {}

export function ExpenseEditFormContainer({ match, history }: Props) {
  const { data, loading } = useQuery<Query>(GET_EXPENSE, {
    variables: { id: match.params.id },
  });
  const [updateExpense] = useMutation(UPDATE_EXPENSE, {
    onCompleted: () => {
      showNotificationFor(5000, 'Expense updated succesfully');
      history.goBack();
    },
  });
  const { showNotificationFor } = useNotification();
  if (loading) return <Loading />;
  if (!data) return <p></p>;
  return (
    <ExpenseForm
      createExpense={updateExpense}
      initialValues={data.getExpense}
    />
  );
}
