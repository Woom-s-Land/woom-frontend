import { useState, useEffect } from 'react';
import GroupApi from '../../apis/GroupApi';
import Modal from '../common/Modal';
import DetailMenuButton from './DetailMenuButton';
import DetailButtonBlue from './DetailButtonBlue';
import MemberInfo from './MemberInfo';

const ITEMS_PER_PAGE = 8; // 페이지당 항목 수

const GroupDetail = () => {
  const [groupInfo, setGroupInfo] = useState({});
  const [requestingUser, setRequestingUser] = useState([]);
  const [groupPage, setGroupPage] = useState(0);
  const [requestPage, setRequestPage] = useState(0);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isClickBasic, setIsClickBasic] = useState(true);
  const [isClickEnter, setIsClickEnter] = useState(false);
  const [isClickCodeShare, setIsClickCodeShare] = useState(false);
  const [inviteCode, setInviteCode] = useState('dagkdsa-45dasdg');
  const [copySuccess, setCopySuccess] = useState(false);
  const [icon, setIcon] = useState('bg-gr-copy');

  const handleClickEnter = () => {
    setIsClickEnter(true);
    setIsClickBasic(false);
  };

  const handleClickBasic = () => {
    setIsClickEnter(false);
    setIsClickBasic(true);
  };

  const handleClickInvite = () => {
    setIsClickCodeShare((prev) => !prev);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(inviteCode)
      .then(() => {
        setCopySuccess(true);
        setIcon('bg-gr-check-fill'); // 아이콘 변경
        setTimeout(() => {
          setCopySuccess(false);
          setIcon('bg-gr-copy'); // 3초 후 아이콘 복원
        }, 3000);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const handlePrevPage = () => {
    if (isClickBasic) {
      setGroupPage((prevPage) => Math.max(prevPage - 1, 0));
    } else {
      setRequestPage((prevPage) => Math.max(prevPage - 1, 0));
    }
  };

  const handleNextPage = () => {
    console.log(groupMaxPage);
    console.log(requestMaxPage);
    if (isClickBasic) {
      setGroupPage((prevPage) => Math.min(prevPage + 1, groupMaxPage));
    } else {
      setRequestPage((prevPage) => Math.min(prevPage + 1, requestMaxPage));
    }
  };

  useEffect(() => {
    setGroupInfo({
      woomsId: 0,
      woomsInviteCode: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      woomsTitle: '이이공육',
      mapColorStatus: 'RED',
      userInfoDtoList: [
        // Sample data
        { uuid: '1', name: '김도예', nickname: '바보', costume: 0 },
        { uuid: '2', name: '송도언', nickname: '멍청이', costume: 0 },
        { uuid: '3', name: '이현수', nickname: '똥개', costume: 0 },

        // Add more sample data as needed
      ],
    });
    setRequestingUser([
      // Sample data
      { uuid: '4', name: '신청자1', nickname: '신청닉1', costume: 0 },
      { uuid: '5', name: '신청자2', nickname: '신청닉2', costume: 0 },
      { uuid: '6', name: '신청자3', nickname: '신청닉1', costume: 0 },
      { uuid: '7', name: '신청자4', nickname: '신청닉2', costume: 0 },
      { uuid: '8', name: '신청자5', nickname: '신청닉1', costume: 0 },
      { uuid: '9', name: '신청자6', nickname: '신청닉2', costume: 0 },
      { uuid: '10', name: '신청자7', nickname: '신청닉1', costume: 0 },
      { uuid: '11', name: '신청자8', nickname: '신청닉2', costume: 0 },
      { uuid: '12', name: '신청자9', nickname: '신청닉1', costume: 0 },
      { uuid: '13', name: '신청자10', nickname: '신청닉2', costume: 0 },
      { uuid: '14', name: '신청자11', nickname: '신청닉네임입니', costume: 0 },
      { uuid: '15', name: '신청자12', nickname: '신청닉2', costume: 0 },
    ]);
  }, []);
  const groupMaxPage =
    Math.ceil((groupInfo.userInfoDtoList?.length || 0) / ITEMS_PER_PAGE) - 1;
  const requestMaxPage = Math.ceil(requestingUser.length / ITEMS_PER_PAGE) - 1;
  const currentGroupMembers = groupInfo.userInfoDtoList
    ? groupInfo.userInfoDtoList.slice(
        groupPage * ITEMS_PER_PAGE,
        (groupPage + 1) * ITEMS_PER_PAGE
      )
    : [];

  const currentRequestingUsers = requestingUser.slice(
    requestPage * ITEMS_PER_PAGE,
    (requestPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <Modal>
      <div className='absolute top-16 left-20 text-2xl text-point-color'>
        {groupInfo.woomsTitle}
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
      {isClickCodeShare && (
        <div className='flex items-center absolute top-[105px] right-0'>
          <div
            className='mr-5 pl-6 pr-12 bg-help-bubble h-16 text-sm flex items-center'
            style={{
              backgroundSize: '100% 100%',
              backgroundColor: 'transparent',
            }}
          >
            {inviteCode}
          </div>
          <button
            onClick={handleCopy}
            onMouseLeave={() => setIcon('bg-gr-copy')}
            className={`absolute right-10 ${icon} p-2 bg-contain w-5 h-5 bg-no-repeat`}
          />
        </div>
      )}

      <div className='absolute flex left-12 top-28 w-full'>
        <DetailMenuButton
          buttonText='기본정보'
          isClicked={isClickBasic}
          handleClick={handleClickBasic}
        />
        {isAdmin && (
          <DetailMenuButton
            buttonText='참가 신청'
            isClicked={isClickEnter}
            handleClick={handleClickEnter}
          />
        )}
      </div>

      {isClickBasic ? (
        <div className='mt-28 grid grid-cols-4 gap-2 mx-10'>
          {groupInfo.userInfoDtoList &&
            groupInfo.userInfoDtoList.length > ITEMS_PER_PAGE && (
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
              {isAdmin && (
                <div className='flex flex-row justify-center'>
                  <DetailButtonBlue buttonText='방장 위임' />
                  <DetailButtonBlue buttonText='강퇴' />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-28 grid grid-cols-4 gap-2 mx-8'>
          {requestingUser && requestingUser.length > ITEMS_PER_PAGE && (
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
                <DetailButtonBlue buttonText='수락' />
                <DetailButtonBlue buttonText='거절' />
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default GroupDetail;
