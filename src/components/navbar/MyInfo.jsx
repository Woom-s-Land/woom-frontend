import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import baseUrl from '../../libs/axios/basicAxios';

import { authActions } from '../../store/authSlice';
import { alertActions } from '../../store/alertSlice';

import Modal from '../common/Modal';
import Button from '../common/Button';
import PasswordChange from './PasswordChange';

import BasicImages from './characterBasicImages';
import rightBtn from '../../assets/button/right-bt-up.png';
import leftBtn from '../../assets/button/left-bt-up.png';
import dialogImg from '../../assets/dialog/dialog box big.png';

const costumeList = BasicImages;

const MyInfo = ({ isOpen, handleCloseMyInfo }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [costume, setCostume] = useState(userInfo.costume);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setNickname(userInfo.nickname);
    setCostume(userInfo.costume);
  }, [userInfo]);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, '');
    let byteCount = 0;
    let finalValue = '';

    for (let i = 0; i < value.length; i++) {
      const char = value[i];

      byteCount += char.charCodeAt(0) > 127 ? 2 : 1; // 한글은 2바이트, 그 외는 1바이트
      if (byteCount > 14) break;
      finalValue += char;
    }

    setNickname(finalValue);
  };

  const handleLeft = () => {
    setCostume((prev) => (prev - 1 < 0 ? costumeList.length - 1 : prev - 1));
  };

  const handleright = () => {
    setCostume((prev) => (prev + 1) % costumeList.length);
  };

  const changeInfo = async () => {
    try {
      const response = await baseUrl.patch(
        '/users/character',
        {
          nickname: nickname,
          costume: costume,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(
        authActions.setUserInfo({
          nickname: nickname,
          costume: costume,
          email: userInfo.email,
          userUuid: userInfo.userUuid,
        })
      );
      dispatch(
        alertActions.showAlert({
          message: '정보가 성공적으로 변경되었습니다!',
          type: 'SUCCESS',
        })
      );
    } catch (err) {
      console.log({
        nickname: nickname,
        costume: costume,
      });
      console.error(err);
      dispatch(
        alertActions.showAlert({
          message: '정보가 변경되지 않았습니다. 다시 시도해주세요.',
          type: 'ERROR',
        })
      );
    }
  };

  return (
    <div>
      {isOpen && (
        <Modal onClose={handleCloseMyInfo}>
          <div className='relative flex justify-between items-center mb-6'>
            <section className='flex flex-col items-center w-1/2'>
              <div className='flex w-full items-center justify-center'>
                <img
                  src={leftBtn}
                  alt='leftBtn'
                  className='w-1/12 cursor-pointer'
                  onClick={handleLeft}
                />
                <img
                  src={costumeList[costume]}
                  alt='char_1'
                  placeholder='charactor'
                  className='w-1/3 mx-5'
                />
                <img
                  src={rightBtn}
                  alt='rightBtn'
                  className='w-1/12 cursor-pointer'
                  onClick={handleright}
                />
              </div>
            </section>
            <section className='flex flex-col items-center w-1/2 space-y-2'>
              <div className='relative w-11/12 max-w-sm mr-5'>
                <img src={dialogImg} alt='대화 상자' className='w-full h-24' />
                <input
                  type='text'
                  value={nickname}
                  onChange={handleChange}
                  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 p-2 bg-transparent border border-transparent rounded focus:outline-none text-xl'
                />
              </div>
              <div className='relative w-11/12 max-w-sm mr-5'>
                <img src={dialogImg} alt='대화 상자' className='w-full h-24' />
                <input
                  type='text'
                  value={userInfo.email}
                  disabled
                  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 p-2 bg-transparent border border-transparent rounded focus:outline-none text-xl'
                />
              </div>
              <div className='relative w-11/12 max-w-sm mr-5'>
                <img src={dialogImg} alt='대화 상자' className='w-full h-24' />
                <button
                  onClick={handleModal}
                  className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 p-2 bg-transparent border border-transparent rounded focus:outline-none text-xl text-left'
                >
                  비밀번호 변경
                </button>
              </div>
            </section>
            <div className='absolute translate-y-[182px] left-1/2 transform -translate-x-1/2'>
              <Button label={'저장'} onClick={changeInfo}></Button>
            </div>
          </div>
        </Modal>
      )}
      {isModalOpen && <PasswordChange onClose={handleModal} />}
    </div>
  );
};

export default MyInfo;
