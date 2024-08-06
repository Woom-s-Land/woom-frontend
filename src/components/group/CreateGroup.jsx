import { useState, useRef } from 'react';
import axios from 'axios';
import Modal from '../common/Modal';
const CreateGroup = () => {
  const groupNameRef = useRef('');
  const [inviteCode, setInviteCode] = useState('');
  const [isGroupNameConfirmed, setIsGroupNameConfirmed] = useState(false);
  const [icon, setIcon] = useState('bg-gr-copy'); // 초기 아이콘 상태
  const [copySuccess, setCopySuccess] = useState(false); // 복사 성공 여부
  const [groupName, setGroupName] = useState('');

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

  const handleGroupNameConfirm = () => {
    axios({
      method: 'post',
      url: 'https://i11e206.p.ssafy.io/api/wooms',
      data: {
        woomsTitle: groupNameRef.current,
      },
    })
      .then((res) => {
        setInviteCode(res.woomsInviteCode);
        setIsGroupNameConfirmed(true);
      })
      .catch((err) => {
        console.log(err);
        setIsGroupNameConfirmed(true);
        alert('그룹을 생성하지 못했습니다. 다시 시도해 주세요');
      });
  };

  const getByteLength = (str) => {
    return new Blob([str]).size;
  };

  const handleGroupNameChange = (e) => {
    const value = e.target.value;
    const maxLength = 21; // 최대 21바이트

    if (getByteLength(value) <= maxLength && /^[^\s]*$/.test(value)) {
      // 띄어쓰기 금지
      setGroupName(value);
    }
  };

  return (
    <Modal>
      <div className='flex items-center mb-4'>
        <label className='w-1/3 text-2xl text-base-color'>그룹명</label>
        <input
          type='text'
          ref={groupNameRef}
          value={groupName}
          onChange={handleGroupNameChange}
          className='w-2/3 mr-16 px-10 border-none focus:outline-none bg-group-button h-16 text-lg'
          style={{
            backgroundSize: '100% 100%', // 세로 높이를 100%로 고정하고 가로 폭에 맞게 조정
            backgroundColor: 'transparent',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // 기본 엔터 동작(폼 제출 등) 방지
              handleGroupNameConfirm();
            }
          }}
        />
        <button
          onClick={handleGroupNameConfirm}
          className='absolute right-28 bg-gr-check p-2 bg-contain w-5 h-5 bg-no-repeat'
        />
      </div>
      {isGroupNameConfirmed && (
        <div className='flex items-center mb-4'>
          <label className='w-1/3 text-2xl text-base-color'>초대 코드</label>
          <div
            className='w-2/3 mr-16 px-10 border-none focus:outline-none bg-group-button h-16 text-md flex items-center'
            style={{
              backgroundSize: '100% 100%', // 세로 높이를 100%로 고정하고 가로 폭에 맞게 조정
              backgroundColor: 'transparent',
            }}
          >
            {inviteCode}
          </div>
          <button
            onClick={handleCopy}
            onMouseLeave={() => setIcon('bg-gr-copy')}
            className={`absolute right-28 ${icon} p-2 bg-contain w-5 h-5 bg-no-repeat`}
          />
        </div>
      )}
    </Modal>
  );
};
export default CreateGroup;
