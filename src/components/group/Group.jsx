import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../common/Modal';
import GroupButton from './GroupButton';
import GroupList from './GroupList';
import CreateGroup from './CreateGroup';
import JoinGroup from './JoinGroup';

const Group = () => {
  const [list, setList] = useState([
    {
      woomsId: 0,
      woomsInviteCode: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      woomsTitle: '이이공육',
      mapColorStatus: 'RED',
    },
    {
      woomsId: 1,
      woomsInviteCode: '3fa85f64-5865-4562-b3fc-2c963f66afa6',
      woomsTitle: '신호팸',
      mapColorStatus: 'RED',
    },
    {
      woomsId: 2,
      woomsInviteCode: '3fa85f64-5865-4562-b3fc-2c963f66afa6',
      woomsTitle: '몇글자로제한하',
      mapColorStatus: 'RED',
    },
    {
      woomsId: 3,
      woomsInviteCode: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      woomsTitle: '몇글자로제한하',
      mapColorStatus: 'RED',
    },
    {
      woomsId: 4,
      woomsInviteCode: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      woomsTitle: '이이공육',
      mapColorStatus: 'RED',
    },
    {
      woomsId: 5,
      woomsInviteCode: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      woomsTitle: '이이공육',
      mapColorStatus: 'RED',
    },
    {
      woomsId: 6,
      woomsInviteCode: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      woomsTitle: '몇글자로제한하',
      mapColorStatus: 'RED',
    },
    {
      woomsId: 7,
      woomsInviteCode: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      woomsTitle: '이이공육',
      mapColorStatus: 'RED',
    },
  ]);
  const [activeModal, setActiveModal] = useState('list');
  const handleOpenCreateGroupModal = () => {
    console.log('create');
    setActiveModal('create'); // 그룹 생성 모달 활성화
  };

  const handleOpenJoinGroupModal = () => {
    setActiveModal('join'); // 그룹 참가 모달 활성화
  };

  return (
    <Modal>
      {activeModal === 'list' && (
        <div>
          <div className='absolute z-10 left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2'>
            <button className='bg-cover bg-gr-left-btn w-8 h-8' />
            <button className='bg-cover bg-gr-right-btn w-8 h-8' />
          </div>
          <div>
            {list.length !== 0 ? (
              <GroupList list={list} />
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
      {activeModal === 'create' && <CreateGroup />}
      {activeModal === 'join' && <JoinGroup />}
    </Modal>
  );
};

export default Group;
