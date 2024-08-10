import { useNavigate } from 'react-router-dom';
import ButtonDetail from './ButtonDetail';

const GroupList = ({ list, onClose, handleDetail }) => {
  const navigate = useNavigate();

  const moveToGroup = (woomsId) => () => {
    navigate(`/map/${woomsId}`);
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
          <div>
            <ButtonDetail
              buttonText='이동'
              onClick={moveToGroup(group.woomsId)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
