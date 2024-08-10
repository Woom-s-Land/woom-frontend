import { useState } from 'react';
import Modal from '../common/Modal';
import ButtonDetail from './ButtonDetail';
import GroupApi from '../../apis/GroupApi';
import rolling from '../../assets/common/rolling.gif';
import Error from '../common/Error';

const JoinGroup = ({ onClose, onSuccess }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [icon, setIcon] = useState('bg-gr-check');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckGroupExists = async () => {
    try {
      const data = await GroupApi.getGroupTitle(inviteCode);
      setGroupName(data.result);
      setIcon('bg-gr-check-fill');
      setError(null);
    } catch (err) {
      console.log('Group join error:', err);
      setError('An error occurred while checking the group.');
    }
  };

  const handleJoinGroup = async () => {
    setLoading(true);
    try {
      const data = await GroupApi.requestGroup(inviteCode);
      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 800);
    } catch (err) {
      console.log('Group join error:', err);
      setError('An error occurred while joining the group.');
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <div className='flex flex-col items-center justify-center mb-4'>
            <label className='w-full text-2xl text-base-color mb-2'>
              초대 코드 입력
            </label>
            <div className='w-full flex items-center justify-center relative'>
              <input
                type='text'
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className='w-3/4 px-10 border-none focus:outline-none bg-gr-btn h-16 text-lg'
                style={{
                  backgroundSize: '100% 100%',
                  backgroundColor: 'transparent',
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCheckGroupExists();
                  }
                }}
              />
              <button
                onClick={handleCheckGroupExists}
                className={`absolute ${icon} right-16 p-2 bg-contain w-8 h-8 bg-no-repeat`}
              />
            </div>
          </div>
          {groupName && (
            <div className='flex items-center justify-center'>
              <div className='flex items-center'>
                <div className='text-2xl text-center text-point-color p-5'>
                  {groupName}
                </div>
                <ButtonDetail buttonText='참가' onClick={handleJoinGroup} />
              </div>
              {loading && (
                <div className='flex items-center justify-center mt-4 ml-4'>
                  <img src={rolling} alt='로딩중' className='w-7' />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default JoinGroup;
