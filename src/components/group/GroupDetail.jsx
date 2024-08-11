import { useState, useEffect } from 'react';
import GroupApi from '../../apis/GroupApi';
import Modal from '../common/Modal';
import { useSelector } from 'react-redux';
import ButtonDetailMenu from './ButtonDetailMenu';
import ButtonDetailBlue from './ButtonDetailBlue';
import MemberInfo from './MemberInfo';
import Error from '../common/Error';
const ITEMS_PER_PAGE = 8; // 페이지당 항목 수

const GroupDetail = ({ onClose, woomsId }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [groupInfo, setGroupInfo] = useState({});
  const [requestingUser, setRequestingUser] = useState([]);
  const [groupPage, setGroupPage] = useState(0);
  const [requestPage, setRequestPage] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClickBasic, setIsClickBasic] = useState(true);
  const [isClickEnter, setIsClickEnter] = useState(false);
  const [isClickCodeShare, setIsClickCodeShare] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [icon, setIcon] = useState('bg-gr-copy');
  const [error, setError] = useState(null);

  const handleClickEnter = () => {
    setIsClickEnter(true);
    setIsClickBasic(false);
  };

  const handleClickBasic = () => {
    setIsClickEnter(false);
    setIsClickBasic(true);
  };

  const isMe = (uuid) => {
    return userInfo.userUuid === uuid;
  };

  const handleClickInvite = () => {
    setIsClickCodeShare((prev) => !prev);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(groupInfo.woomsDto?.woomsInviteCode || '')
      .then(() => {
        setCopySuccess(true);
        setIcon('bg-gr-check-fill');
        setTimeout(() => {
          setCopySuccess(false);
          setIcon('bg-gr-copy');
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        setError('Failed to copy the invite code.');
      });
  };

  const handlePrevPage = () => {
    if (isClickBasic) {
      console.log('prev');
      setGroupPage((prevPage) => Math.max(prevPage - 1, 0));
    } else {
      setRequestPage((prevPage) => Math.max(prevPage - 1, 0));
    }
  };

  const handleNextPage = () => {
    if (isClickBasic) {
      console.log('next', groupPage, groupMaxPage);
      setGroupPage((prevPage) => Math.min(prevPage + 1, groupMaxPage));
    } else {
      setRequestPage((prevPage) => Math.min(prevPage + 1, requestMaxPage));
    }
  };

  const getGroupInfo = async () => {
    try {
      const data = await GroupApi.getGroupInfo(woomsId);
      console.log(data);
      setGroupInfo(data);
    } catch (err) {
      setError('Failed to fetch group info.');
      console.error('Failed to fetch group info:', err);
    }
  };

  const isAdminFunc = async (woomsId) => {
    try {
      const data = await GroupApi.isAdmin(woomsId);
      setIsAdmin(data.woomsAdmin);
      if (data.woomsAdmin) getRequestUser();
    } catch (err) {
      console.error('Failed to check admin status:', err);
      setError('Failed to check admin status.');
    }
  };

  const getRequestUser = async () => {
    try {
      const data = await GroupApi.getRequestUser(woomsId, requestPage);
      console.log(data);
      setRequestingUser(data.content);
    } catch (err) {
      setError('Failed to fetch requesting users.');
      console.error('Failed to fetch requesting users:', err);
    }
  };

  useEffect(() => {
    getGroupInfo();
    isAdminFunc(woomsId);
  }, [woomsId, requestPage]);

  useEffect(() => {
    if (Array.isArray(requestingUser)) {
      setCurrentRequestingUsers(
        requestingUser.slice(
          requestPage * ITEMS_PER_PAGE,
          (requestPage + 1) * ITEMS_PER_PAGE
        )
      );
    }
  }, [requestingUser, requestPage]);

  const handleWithdraw = async () => {
    try {
      await GroupApi.withdraw(woomsId);
    } catch (err) {
      console.error('Failed to withdraw from group:', err);
      setError('Failed to withdraw from group.');
    }
  };

  const groupMaxPage =
    Math.ceil((groupInfo.userInfoDtoList?.length || 0) / ITEMS_PER_PAGE) - 1;

  const requestMaxPage =
    Math.ceil((requestingUser?.length || 0) / ITEMS_PER_PAGE) - 1;

  const currentGroupMembers = groupInfo.userInfoDtoList
    ? groupInfo.userInfoDtoList.slice(
        groupPage * ITEMS_PER_PAGE,
        (groupPage + 1) * ITEMS_PER_PAGE
      )
    : [];

  const [currentRequestingUsers, setCurrentRequestingUsers] = useState([]);

  const handleRequestResponse = async (uuid, response) => {
    try {
      await GroupApi.responseRequest(woomsId, uuid, response);
      getRequestUser();
      getGroupInfo();
    } catch (err) {
      console.log('error');
      setError(err);
    }
  };

  const handleDelegate = async (uuid) => {
    try {
      await GroupApi.delegateAdmin(woomsId, uuid);
      setIsAdmin(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleResign = () => {
    console.log('강퇴');
    alert('관리자에게 문의해 주세요!');
  };

  const handleDelete = async () => {
    if (groupInfo.userInfoDtoList?.length > 1) {
      alert('모든 그룹원이 나가야 그룹을 삭제할 수 있습니다.');
    } else {
      try {
        await GroupApi.deleteGroup(woomsId);
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <Modal onClose={onClose}>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <div className='absolute top-16 left-20 text-2xl text-point-color'>
            {groupInfo.woomsDto?.woomsTitle}
          </div>
          <div
            onClick={handleClickInvite}
            className='absolute cursor-pointer flex top-20 right-10 items-center'
          >
            <img
              className='mx-2'
              src='/src/assets/group/external.png'
              alt='External'
            />
            <div className='text-md text-base-color'>초대코드 공유하기</div>
          </div>
          {isAdmin ? (
            <button
              onClick={handleDelete}
              className=' whitespace-nowrap text-sm active:bg-gr-btn-active bg-gr-btn bg-contain bg-no-repeat bg-center p-3 absolute bottom-1 right-8 text-center text-base-color'
            >
              그룹 삭제
            </button>
          ) : (
            <button
              onClick={handleWithdraw}
              className=' whitespace-nowrap text-sm active:bg-gr-btn-active bg-gr-btn bg-contain bg-no-repeat bg-center p-3 absolute bottom-1 right-8 text-center text-base-color'
            >
              나가기
            </button>
          )}
          {isClickCodeShare && (
            <div className='flex items-center absolute top-[105px] right-0'>
              <div
                className='mr-5 pl-6 pr-12 bg-help-bubble h-16 text-sm flex items-center'
                style={{
                  backgroundSize: '100% 100%',
                  backgroundColor: 'transparent',
                }}
              >
                {groupInfo.woomsDto?.woomsInviteCode}
              </div>
              <button
                onClick={handleCopy}
                onMouseLeave={() => setIcon('bg-gr-copy')}
                className={`absolute right-10 ${icon} p-2 z-20 bg-contain w-5 h-5 bg-no-repeat`}
              />
            </div>
          )}

          <div className='absolute flex left-12 top-28 w-full'>
            <ButtonDetailMenu
              buttonText='기본정보'
              isClicked={isClickBasic}
              handleClick={handleClickBasic}
            />
            {isAdmin && (
              <ButtonDetailMenu
                buttonText='참가 신청'
                isClicked={isClickEnter}
                handleClick={handleClickEnter}
              />
            )}
          </div>

          {isClickBasic && (
            <div className='mt-28 grid grid-cols-4 gap-2 mx-10'>
              {groupInfo.userInfoDtoList?.length > ITEMS_PER_PAGE && (
                <div className='absolute z-10 left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-[270px]'>
                  <button
                    onClick={handlePrevPage}
                    className='bg-cover bg-gr-left-btn w-8 h-8'
                  />
                  <button
                    onClick={handleNextPage}
                    className='bg-cover bg-gr-right-btn w-8 h-8'
                  />
                </div>
              )}
              {currentGroupMembers.map((member) => (
                <div key={member.uuid} className='flex flex-col'>
                  <MemberInfo member={member} />
                  {isAdmin && !isMe(member.uuid) && (
                    <div className='flex flex-row justify-center'>
                      <ButtonDetailBlue
                        buttonText='방장 위임'
                        handleClick={() => handleDelegate(member.uuid)}
                      />
                      <ButtonDetailBlue
                        buttonText='강퇴'
                        handleClick={handleResign}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {isClickEnter && (
            <div className='mt-28 grid grid-cols-4 gap-2 mx-8'>
              {requestingUser && requestingUser?.length > ITEMS_PER_PAGE && (
                <div className='absolute z-10 left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-[270px]'>
                  <button
                    onClick={handlePrevPage}
                    className='bg-cover bg-gr-left-btn w-8 h-8'
                  />
                  <button
                    onClick={handleNextPage}
                    className='bg-cover bg-gr-right-btn w-8 h-8'
                  />
                </div>
              )}
              {currentRequestingUsers.map((member) => (
                <div key={member.uuid} className='flex flex-col'>
                  <MemberInfo member={member} />
                  <div className='flex flex-row justify-center'>
                    <ButtonDetailBlue
                      buttonText='수락'
                      handleClick={() =>
                        handleRequestResponse(member.uuid, 'ACCEPT')
                      }
                    />
                    <ButtonDetailBlue
                      buttonText='거절'
                      handleClick={() =>
                        handleRequestResponse(member.uuid, 'REFUSE')
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default GroupDetail;
