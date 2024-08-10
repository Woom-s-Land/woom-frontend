import { useState, useRef } from 'react';
import GroupApi from '../../apis/GroupApi';
import Modal from '../common/Modal';
import Error from '../common/Error';

const CreateGroup = ({ onClose }) => {
  const groupNameRef = useRef('');
  const [inviteCode, setInviteCode] = useState('');
  const [isGroupNameConfirmed, setIsGroupNameConfirmed] = useState(false);
  const [confirmIcon, setConfirmIcon] = useState('bg-gr-check');
  const [copyIcon, setCopyIcon] = useState('bg-gr-copy'); // 초기 아이콘 상태
  const [copySuccess, setCopySuccess] = useState(false); // 복사 성공 여부
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(inviteCode)
      .then(() => {
        setCopySuccess(true);
        setCopyIcon('bg-gr-check-fill'); // 아이콘 변경
        setTimeout(() => {
          setCopySuccess(false);
          setCopyIcon('bg-gr-copy'); // 3초 후 아이콘 복원
        }, 3000);
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const handleGroupNameConfirm = async () => {
    if (isGroupNameConfirmed || groupName.length === 0) return;
    console.log('name confirm', groupName);
    try {
      const data = await GroupApi.createGroup(groupName);
      console.log(data);
      setIsGroupNameConfirmed(true);
      setConfirmIcon('bg-gr-check-fill');
      setInviteCode(data.woomsInviteCode);
    } catch (err) {
      console.log('err', err);
      setError('Fail. Please try again later.');
    }
  };

  const getByteLength = (str) => {
    return new Blob([str]).size;
  };

  const handleGroupNameChange = (e) => {
    const value = e.target.value;
    const maxLength = 21; // 최대 21바이트

    if (getByteLength(value) <= maxLength) {
      setGroupName(value);
    }
  };

  return (
    <Modal onClose={onClose}>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <div className='flex items-center mb-4'>
            <label className='w-1/3 text-2xl text-base-color'>그룹명</label>
            <input
              type='text'
              ref={groupNameRef}
              value={groupName}
              onChange={handleGroupNameChange}
              className='w-2/3 mr-16 px-10 border-none focus:outline-none bg-gr-btn h-16 text-lg'
              style={{
                backgroundSize: '100% 100%',
                backgroundColor: 'transparent',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleGroupNameConfirm();
                }
              }}
            />
            <button
              onClick={handleGroupNameConfirm}
              className={`absolute right-[100px] ${confirmIcon} p-2 bg-contain w-5 h-5 bg-no-repeat`}
            />
          </div>
          {isGroupNameConfirmed && (
            <div className='flex items-center mb-4'>
              <label className='w-1/3 text-2xl text-base-color'>
                초대 코드
              </label>
              <div
                className='w-2/3 mr-16 px-10 border-none focus:outline-none bg-gr-btn h-16 text-md flex items-center'
                style={{
                  backgroundSize: '100% 100%',
                  backgroundColor: 'transparent',
                }}
              >
                {inviteCode}
              </div>
              <button
                onClick={handleCopy}
                onMouseLeave={() => setCopyIcon('bg-gr-copy')}
                className={`absolute right-[100px] ${copyIcon} p-2 bg-contain w-5 h-5 bg-no-repeat`}
              />
            </div>
          )}
        </>
      )}
    </Modal>
  );
};
export default CreateGroup;
