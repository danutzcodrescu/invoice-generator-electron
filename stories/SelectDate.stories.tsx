import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { SelectDates } from '../src/renderer/components/toolbox/SelectDates.component';
import { defaultDate } from '../src/renderer/components/utils/client';
import { Wrapper } from './Client.stories';

storiesOf('Components/SelectDates', module).add('SelectDates', () => (
  <Wrapper>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <SelectDates
        onChange={(e) => console.log(e.target.value)}
        defaultValue={defaultDate}
      />
    </MuiPickersUtilsProvider>
  </Wrapper>
));
