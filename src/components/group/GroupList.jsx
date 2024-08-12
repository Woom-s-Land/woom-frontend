import { useNavigate } from 'react-router-dom';
import ButtonDetail from './ButtonDetail';
import { useDispatch } from 'react-redux';
import { groupActions } from '../../store/groupSlice';
import instance from '../../libs/axios/basicAxios';

const GroupList = ({ list, onClose, handleDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToGroup = (group) => () => {
    dispatch(groupActions.setGroupInfo(group));

    try {
      instance.get(`/wooms/channel?${group.woomsInviteCode}`);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
    navigate(`/map/${group.woomsId}`);
    onClose();
  };

  return (
    <div className='grid grid-cols-2 gap-4 mx-5 flex items-center justify-center'>
      {list.map((group, index) => (
        <div className='flex items-center justify-center' key={group.woomsId}>
          <div
            onClick={() => handleDetail(group)}
            className='text-2xl cursor-pointer z-20 text-base-color min-w-[150px]'
          >
            {group.woomsTitle}
          </div>
          <ButtonDetail buttonText='이동' onClick={moveToGroup(group)} />
        </div>
      ))}
    </div>
  );
};

export default GroupList;
