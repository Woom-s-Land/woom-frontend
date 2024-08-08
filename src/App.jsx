import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './MainPage.jsx';
import Home from './world/Home.jsx';
import Map from './world/Map.jsx';
import Login from './components/auth/Login';
import Photo from './components/groupSpace/photo/PhotoModal';
import Comment from './components/groupSpace/comment/CommentModal.jsx';
import OauthHandler from './components/auth/OauthHandler';
import Signup from './components/auth/Signup';
import PhotoHeatMap from './components/groupSpace/photoHeatmap/PhotoHeatMap.jsx';
import Group from './components/group/Group.jsx';
import CreateGroup from './components/group/CreateGroup.jsx';
import StoryWrite from './components/groupSpace/story/StoryWriteModal';
import StoryRead from './components/groupSpace/story/StoryReadModal';
import Header from './components/navbar/Menubar.jsx';
import PasswordReset from './components/auth/PasswordReset';
import GroupDetail from './components/group/GroupDetail.jsx';
import MyInfo from './components/navbar/MyInfo';
import LetterList from './components/groupSpace/letter/LetterList.jsx';
import Loading from './components/common/Loading.jsx';
import ChooseUser from './components/groupSpace/letter/ChooseUser';
import WriteLetter from './components/groupSpace/letter/WriteLetter';
import MainLetter from './components/groupSpace/letter/MainLetter';
import DropDown from './components/common/DropDown.jsx';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/map' element={<Map />} />
        <Route path='/login' element={<Login />} />
        <Route path='/photo' element={<Photo />} />
        <Route path='/comment' element={<Comment />} />
        <Route path='/heatmap' element={<PhotoHeatMap />} />
        <Route path='/group' element={<Group />} />
        <Route path='/creategroup' element={<CreateGroup />} />
        <Route path='/group-detail' element={<GroupDetail />} />
        <Route path='/story-write' element={<StoryWrite />} />
        <Route path='/story-read' element={<StoryRead />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/auth/oauth-response' element={<OauthHandler />} />
      </Routes>
    </div>
  );
}

export default App;
