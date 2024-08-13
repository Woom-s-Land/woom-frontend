import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { groupActions } from '../../store/groupSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuButton from './MenuButton';
import MyInfo from './MyInfo';
import Group from '../group/Group';
import { logout } from '../../apis/LogoutApi';
import { authActions } from '../../store/authSlice'; // Redux 액션 임포트
import { settingActions } from '../../store/settingSlice'; // Redux 액션 임포트

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groupInfo = useSelector((state) => state.group.groupInfo);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMyInfoOpen, setIsMyInfoOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [woomsTitle, setWoomsTitle] = useState('');

  const isPlaying = useSelector((state) => state.setting.audioIsPlaying);
  const location = useLocation(); // 현재 어떤 url 에 접속해있는지 확인
  const isMapPage = location.pathname.startsWith('/map/');
  const isHomePage = location.pathname.startsWith('/home');
  const isNoneMapOrHome = !isMapPage && !isHomePage;

  useEffect(() => {
    if (isHomePage) {
      dispatch(groupActions.exit());
    }
  }, [isHomePage]);

  useEffect(() => {
    if (groupInfo && groupInfo.woomsTitle) setWoomsTitle(groupInfo.woomsTitle);
  }, [groupInfo]);

  const handleCloseMyInfo = () => {
    setIsMyInfoOpen(false);
  };

  const handleCloseGroup = () => {
    setIsGroupOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((isOpen) => !isOpen);
  };

  const handleMyInfoClick = () => {
    setIsMyInfoOpen(true);
    toggleMenu();
  };

  const handleGroupClick = () => {
    setIsGroupOpen(true);
    toggleMenu();
  };

  const handleLogoutClick = async () => {
    try {
      // API 요청을 통해 서버 측 로그아웃 처리
      const success = await logout();

      if (success) {
        // Redux 상태 초기화
        dispatch(authActions.logout());

        // 로그인 페이지로 리디렉션
        navigate('/');
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const toggleMute = () => {
    if (isPlaying) {
      dispatch(settingActions.pauseAudio());
    } else {
      dispatch(settingActions.playAudio());
    }
  };

  const groupMap = isMapPage
    ? 'fixed w-full h-24 left-1/2 transform -translate-x-1/2 inline-flex items-center justify-center bg-no-repeat bg-opacity-0 bg-center bg-gr-title'
    : '';
  const home = isHomePage ? 'bg-home-title w-32 h-24' : '';

  return (
    <header
      className={`${isNoneMapOrHome ? 'hidden' : isMapPage ? 'header-hidden' : ''}`}
    >
      <div
        className={`inline-flex bg-no-repeat bg-center ${
          isMapPage ? groupMap : home
        }`}
      >
        {woomsTitle && (
          <div className='whitespace-nowrap mx-3 text-2xl text-point-color'>
            {woomsTitle}
          </div>
        )}
      </div>

      <div className='fixed w-full top-4 right-6 flex gap-4 justify-end'>
        <button
          aria-label='BGM 음소거 토글'
          className={`bg-cover w-12 h-12 ${isPlaying ? 'bg-bgm-x' : 'bg-bgm-o'}`}
          onClick={toggleMute}
        />
        <button
          aria-label='메뉴 토글'
          className='bg-cover bg-menu w-12 h-12'
          onClick={toggleMenu}
        />
      </div>
      {isMenuOpen && (
        <>
          <div
            className='fixed inset-0 opacity-50 z-10'
            onClick={toggleMenu}
          ></div>
          <nav className='fixed top-16 right-1 m-0 p-0 z-20 rounded flex flex-col space-y-1'>
            <MenuButton
              buttonText='내 정보 수정'
              onClickEventHandler={handleMyInfoClick}
            />
            <MenuButton
              buttonText='그룹 목록 '
              onClickEventHandler={handleGroupClick}
            />
            <MenuButton
              buttonText='로그 아웃'
              onClickEventHandler={handleLogoutClick}
            />
          </nav>
        </>
      )}
      <MyInfo isOpen={isMyInfoOpen} handleCloseMyInfo={handleCloseMyInfo} />
      <Group isOpen={isGroupOpen} handleCloseGroup={handleCloseGroup} />
    </header>
  );
}

export default Header;
