import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
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
        <MaterialUIThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Component />
          </ThemeProvider>
        </MaterialUIThemeProvider>
      </>
    </AppContainer>,
    document.querySelector('#app'),
  );
};

render(Application);
