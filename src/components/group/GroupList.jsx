import { useNavigate } from 'react-router-dom';
import ButtonDetail from './ButtonDetail';
import { useDispatch } from 'react-redux';
import { groupActions } from '../../store/groupSlice';
import GroupApi from '../../apis/GroupApi';

const GroupList = ({ list, onClose, handleDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToGroup = (group) => () => {
    dispatch(groupActions.setGroupInfo(group));
    GroupApi.editToken(group.woomsInviteCode);
    navigate(`/map/${group.woomsId}`);
    onClose();
  };

  return (
    <div className='grid grid-cols-2 gap-4 mx-5 flex items-center justify-center'>
      {list.map((group, index) => (
        <div className='flex items-center justify-center' key={group.woomsId}>
          <div
            onClick={() => handleDetail(group.woomsId)}
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
