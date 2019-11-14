import { useMutation } from '@apollo/react-hooks';
import * as React from 'react';
import { ExpenseForm } from '../components/expenses/ExpenseForm.component';
import { CREATE_EXPENSE } from '../graphql/mutations';

export function ExpenseFormContainer() {
  const [createExpense] = useMutation(CREATE_EXPENSE);
  return <ExpenseForm createExpense={createExpense} />;
}
