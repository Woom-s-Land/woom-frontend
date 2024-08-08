import { useNavigate } from 'react-router-dom';
import DetailButton from './DetailButton';

const GroupList = ({ list, onClose, handleDetail }) => {
  const navigate = useNavigate();

  const moveToGroup = (woomsId) => () => {
    navigate(`/map/${woomsId}`);
    onClose();
  };

  return (
    <table className='table-auto mx-auto mb-5'>
      <tbody>
        {list.map((group, index) =>
          index % 2 === 0 ? (
            <tr key={group.woomsId} className='my-3'>
              <td
                onClick={handleDetail}
                className='text-2xl cursor-pointer text-base-color min-w-[150px]'
              >
                {group.woomsTitle}
              </td>
              <td>
                <DetailButton
                  buttonText='이동'
                  onClick={moveToGroup(group.woomsId)}
                />
              </td>
              {list[index + 1] ? (
                <>
                  <td className='text-2xl text-base-color min-w-[150px]'>
                    {list[index + 1].woomsTitle}
                  </td>
                  <td>
                    <DetailButton
                      buttonText='이동'
                      onClick={moveToGroup(list[index + 1].woomsId)}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className='min-w-[150px]'></td>
                  <td>
                    <DetailButton buttonText='이동' visibility='invisible' />
                  </td>
                </>
              )}
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
};

export default GroupList;
