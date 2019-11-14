import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import StoryRouter from 'storybook-react-router';
import { ExpenseFormContainer } from '../src/renderer/containers/ExpenseForm.container';
import { ExpenseTableContainer } from '../src/renderer/containers/ExpenseTable.container';
import { Wrapper } from './Client.stories';

storiesOf('Components/Expenses', module)
  .add('ExpenseForm', () => (
    <Wrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ExpenseFormContainer />
      </MuiPickersUtilsProvider>
    </Wrapper>
  ))
  .addDecorator(StoryRouter())
  .add('Expense table', () => (
    <Wrapper>
      <ExpenseTableContainer />
    </Wrapper>
  ));
