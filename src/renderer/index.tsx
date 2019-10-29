import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { Application } from './components/Application';
import { theme } from './theme/theme';

const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <AppContainer>
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Component />
        </ThemeProvider>
      </>
    </AppContainer>,
    document.querySelector('#app'),
  );
};

render(Application);
