import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../common/Modal';
import ButtonGroup from './ButtonGroup';
import GroupList from './GroupList';
import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';
import GroupApi from '../../apis/GroupApi';
import GroupDetail from './GroupDetail';
import { alertActions } from '../../store/alertSlice';

const Group = ({ isOpen, handleCloseGroup }) => {
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState('list');
  const [groupData, setGroupData] = useState(null);
  const [woomsId, setWoomsId] = useState();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getGroupList = async () => {
      try {
        const data = await GroupApi.getMyGroup(page);
        setGroupData(data);
        setTotalPage(data.totalPages - 1);
      } catch (error) {
        dispatch(
          alertActions.showAlert({
            message:
              'Wooms 목록 조회에 실패하였습니다. 페이지를 새로고침 해주세요',
            type: 'ERROR',
          })
        );
      }
    };

    getGroupList();
  });

  const handlePrevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPage, prev + 1));
  };
  const handleOpenGroupListModal = () => {
    setActiveModal('list'); // 그룹 목록 모달 활성화
  };
  const handleOpenCreateGroupModal = () => {
    console.log('create');
    setActiveModal('create'); // 그룹 생성 모달 활성화
  };

  const handleOpenJoinGroupModal = () => {
    setActiveModal('join'); // 그룹 참가 모달 활성화
  };

  const handleOpenDetailGroupModal = (woomsId) => {
    setWoomsId(woomsId);
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
                {groupData ? (
                  groupData.totalElements > 0 ? (
                    <GroupList
                      list={groupData.content}
                      onClose={handleClose}
                      handleDetail={handleOpenDetailGroupModal}
                    />
                  ) : (
                    <p className='text-base-color text-3xl'>없음</p>
                  )
                ) : (
                  <p>로딩 중...</p>
                )}
              </div>
              <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2 flex justify-center w-full max-w-md'>
                <ButtonGroup
                  buttonText='그룹 생성'
                  onClickEventHandler={handleOpenCreateGroupModal}
                />
                <ButtonGroup
                  buttonText='그룹 참가'
                  onClickEventHandler={handleOpenJoinGroupModal}
                />
              </div>
            </div>
          )}
          {activeModal === 'create' && <CreateGroup onClose={handleClose} />}
          {activeModal === 'join' && (
            <JoinGroup
              onClose={handleClose}
              onSuccess={handleOpenGroupListModal}
            />
          )}
          {activeModal === 'detail' && (
            <GroupDetail onClose={handleClose} woomsId={woomsId} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Group;
