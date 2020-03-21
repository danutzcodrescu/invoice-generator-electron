import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto';
import { Application } from './components/Application';

const render = (Component: () => JSX.Element) => {
  ReactDOM.render(<Component />, document.querySelector('#app'));
};

hot(render(Application));
