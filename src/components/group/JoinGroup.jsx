import { useState, useRef } from 'react';
import Modal from '../common/Modal';
import DetailButton from './DetailButton';
import GroupApi from '../../apis/GroupApi';
import { Spinner } from '@chakra-ui/react';

const JoinGroup = ({ onClose, onSuccess }) => {
  const inviteCodeRef = useRef('');
  const [groupName, setGroupName] = useState('');
  const [icon, setIcon] = useState('bg-gr-check');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleCheckGroupExists = async () => {
    // #todo:  axios
    try {
      const data = await GroupApi.getGroupTitle(inviteCodeRef.current);
      console.log(data);
      setGroupName(data);
      setIcon('bg-gr-check-fill');
    } catch (err) {
      console.log('group join error');
      setError(true);
    }
  };
  const handleJoinGroup = async () => {
    // #todo-check: 요청 성공 시 목록으로 돌아감
    setLoading(true);
    try {
      const data = await GroupApi.requestGroup(inviteCodeRef.current);
      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 2000);
    } catch (err) {
      console.log('group join error');
      setError(true);
    }
  };
  return (
    <Modal onClose={onClose}>
      <div className='flex flex-col items-center justify-center mb-4'>
        <label className='w-full text-2xl text-base-color mb-2'>
          초대 코드 입력
        </label>
        <div className='w-full flex items-center justify-center'>
          <input
            type='text'
            ref={inviteCodeRef}
            className='w-3/4 px-10 border-none focus:outline-none bg-gr-btn h-16 text-lg'
            style={{
              backgroundSize: '100% 100%', // 세로 높이를 100%로 고정하고 가로 폭에 맞게 조정
              backgroundColor: 'transparent',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // 기본 엔터 동작(폼 제출 등) 방지
                handleCheckGroupExists();
              }
            }}
          />
          {!loading ? (
            <button
              onClick={handleCheckGroupExists}
              className={`absolute ${icon} right-[130px] p-2 bg-contain w-5 h-5 bg-no-repeat`}
            />
          ) : (
            <div className='absolute right-[130px] p-2 w-5 h-5'>
              <Spinner size='xs' />
            </div>
          )}
        </div>
      </div>
      {groupName.length !== 0 && (
        <div className='flex items-center justify-center'>
          <div className='text-2xl text-center text-point-color p-5'>
            {groupName}
          </div>
          <DetailButton buttonText='참가' onClick={handleJoinGroup} />
        </div>
      )}
    </Modal>
  );
};
export default JoinGroup;
