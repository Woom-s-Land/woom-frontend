import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import GroupButton from './GroupButton';
import GroupList from './GroupList';
import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';
import GroupApi from '../../apis/GroupApi';
import GroupDetail from './GroupDetail';

const Group = ({ isOpen, handleCloseGroup }) => {
  const [activeModal, setActiveModal] = useState('list');
  const [groupData, setGroupData] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    const getGroupList = async () => {
      try {
        const data = await GroupApi.getMyGroup(page);
        setGroupData(data);
        setTotalPage(data.totalPages - 1);
        console.log(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch group data:', err);
        setError('Failed to fetch group data. Please try again later.');
      }
    };

    getGroupList();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPage, prev + 1));
  };
  const handleOpenCreateGroupModal = () => {
    console.log('create');
    setActiveModal('create'); // 그룹 생성 모달 활성화
  };

  const handleOpenJoinGroupModal = () => {
    setActiveModal('join'); // 그룹 참가 모달 활성화
  };

  const handleOpenDetailGroupModal = () => {
    setActiveModal('detail'); // 그룹 상세 모달 활성화
  };

  const handleClose = () => {
    setActiveModal('list');
    handleCloseGroup();
  };
  return (
    <div>
      {isOpen && (
        <Modal onClose={handleClose}>
          {activeModal === 'list' && (
            <div>
              <div className='absolute z-10 left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2'>
                <button
                  className='bg-cover bg-gr-left-btn w-8 h-8'
                  onClick={handlePrevPage}
                />
                <button
                  className='bg-cover bg-gr-right-btn w-8 h-8'
                  onClick={handleNextPage}
                />
              </div>
              <div>
                {groupData.totalElements > 0 ? (
                  <GroupList
                    list={groupData.content}
                    onClose={handleClose}
                    handleDetail={handleOpenDetailGroupModal}
                  />
                ) : (
                  <p className='text-base-color text-3xl'>없음</p>
                )}
              </div>
              <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 flex justify-center w-full max-w-md'>
                <GroupButton
                  buttonText='그룹 생성'
                  onClickEventHandler={handleOpenCreateGroupModal}
                />
                <GroupButton
                  buttonText='그룹 참가'
                  onClickEventHandler={handleOpenJoinGroupModal}
                />
              </div>
            </div>
          )}
          {activeModal === 'create' && <CreateGroup onClose={handleClose} />}
          {activeModal === 'join' && <JoinGroup onClose={handleClose} />}
          {activeModal === 'detail' && <GroupDetail onClose={handleClose} />}
        </Modal>
      )}
    </div>
  );
};

export default Group;
