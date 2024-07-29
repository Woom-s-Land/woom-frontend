import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/auth/Login';
import OauthHandler from './components/auth/OauthHandler';

function App() {
  return (
    <div>
      <Login />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/auth/oauth-response' element={<OauthHandler />} />
      </Routes>
    </div>
  );
}

export default App;
