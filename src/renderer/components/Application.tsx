import axios from 'axios';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { ClientForm } from './client/ClientForm.component';

export const Application = () => {
  React.useEffect(() => {
    axios
      .get('http://localhost:3000/')
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }, []);
  return <ClientForm />;
};

export default hot(Application);
