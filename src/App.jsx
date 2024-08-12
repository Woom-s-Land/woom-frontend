import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
import StoryWrite from './components/groupSpace/radio/StoryWriteModal';
import StoryRead from './components/groupSpace/radio/StoryReadModal';
import Header from './components/navbar/Menubar.jsx';
import PasswordReset from './components/auth/PasswordReset';
import GroupDetail from './components/group/GroupDetail.jsx';
import MyInfo from './components/navbar/MyInfo';
import LetterList from './components/groupSpace/letter/LetterList.jsx';
import Loading from './components/common/Loading.jsx';
import ChooseUser from './components/groupSpace/letter/ChooseUser';
import WriteLetter from './components/groupSpace/letter/WriteLetter';
import WriteLetterMain from './components/groupSpace/letter/WriteLetterMain.jsx';
import DropDown from './components/common/DropDown.jsx';
import PlayBgm from './components/bgm/PlayBgm.jsx';
import ReadLetterMain from './components/groupSpace/letter/ReadLetterMain.jsx';
import ChatBox from './components/groupSpace/ChatBox.jsx';

function App() {
  const location = useLocation();

  // 음악을 재생할 페이지 정의
  const playMusicOnPages = ['/home', '/map/:woomsId'];

  // 현재 경로가 음악을 재생할 페이지와 일치하는지 확인
  const playOnPage = playMusicOnPages.some((path) => {
    // 경로 파라미터 처리 (예: /map/:woomsId)
    return new RegExp(`^${path.replace(/:\w+/, '\\w+')}($|/)`).test(
      location.pathname
    );
  });

  return (
    <div className='App cursor-custom'>
      <PlayBgm playOnPage={playOnPage} />
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/map/:woomsId' element={<Map />} />
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
