import { Routes, Route } from 'react-router-dom';
import Main from './MainPage.jsx';
import Home from './world/Home.jsx';
import Map from './world/Map.jsx';
import Login from './components/auth/Login';
import Photo from './components/groupSpace/photo/PhotoModal';
import OauthHandler from './components/auth/OauthHandler';
import Signup from './components/auth/Signup';
import PhotoHeatMap from './components/groupSpace/photoHeatmap/PhotoHeatMap.jsx';
import Group from './components/group/Group.jsx';
import CreateGroup from './components/group/CreateGroup.jsx';
import PasswordReset from './components/auth/PasswordReset';

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
        <Route path='/heatmap' element={<PhotoHeatMap />} />
        <Route path='/group' element={<Group />} />
        <Route path='/creategroup' element={<CreateGroup />} />
        <Route path='/auth/oauth-response' element={<OauthHandler />} />
      </Routes>
    </div>
  );
}

export default App;
