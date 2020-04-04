import * as React from 'react';
import { render } from 'react-dom';
import 'typeface-roboto';
import Application from './components/Application';
import { init } from '@sentry/electron';
import { remote } from 'electron';
import { SENTRY_DSN } from '../backend/constants';

if (process.env.NODE_ENV === 'production') {
  init({
    dsn: SENTRY_DSN,
    enableNative: false,
    release: `${remote.app.name}_${remote.app.getVersion()}`,
  });
}

render(<Application />, document.querySelector('#app'));
