import { useState } from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <Fragment>
      {/* <Login /> */}
      <Signup />
    </Fragment>
  );
}

export default App;
