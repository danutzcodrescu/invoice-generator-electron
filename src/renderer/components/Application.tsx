import axios from 'axios';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';

export const Application = () => {
  React.useEffect(() => {
    axios
      .get('localhost:3000')
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }, []);
  return <h1>test</h1>;
};

export default hot(Application);
