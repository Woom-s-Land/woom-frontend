import { Routes, Route } from 'react-router-dom';
import Main from './MainPage.jsx';
import Home from './world/Home.jsx';
import Map from './world/Map.jsx';
import Login from './components/auth/Login';
import Photo from './components/groupSpace/photo/PhotoModal';
import Comment from './components/groupSpace/comment/CommentModal.jsx'
import OauthHandler from './components/auth/OauthHandler';
import Signup from './components/auth/Signup';

import PasswordReset from './components/auth/PasswordReset';
import Modal from './components/common/Modal.jsx';

function App() {
  return (
    <div>
      {/* <Login /> */}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/map' element={<Map />} />
        <Route path='/login' element={<Login />} />
        <Route path='/photo' element={<Photo />} />
        <Route path='/comment' element={<Comment />} />
        <Route path='/auth/oauth-response' element={<OauthHandler />} />
      </Routes>
    </div>
  );
}

export default App;
