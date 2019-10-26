import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Application } from './components/Application';

const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector('#app'),
  );
};

render(Application);
