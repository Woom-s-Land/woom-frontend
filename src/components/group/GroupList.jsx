import DetailButton from './DetailButton';
const GroupList = ({ list }) => {
  return (
    <table className='table-auto mx-auto mb-5'>
      <tbody>
        {list.map(
          (group, index) =>
            index % 2 === 0 && (
              <tr key={group.woomsId} className='my-3'>
                <td className='text-2xl text-base-color'>{group.woomsTitle}</td>
                <td>
                  <DetailButton />
                </td>
                {list[index + 1] && (
                  <>
                    <td className='text-2xl text-base-color'>
                      {list[index + 1].woomsTitle}
                    </td>
                    <td>
                      <DetailButton />
                    </td>
                  </>
                )}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};
export default GroupList;
