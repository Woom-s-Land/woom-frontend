import { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from '../../common/Modal';
import Button from '../../common/Button';

const baseUrl = 'https://i11e206.p.ssafy.io';

const ChooseUser = ({ onClose, onChange, onNext }) => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/wooms`, {
          withCredentials: true,
        });
        setGroups(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getGroups();
  }, []);

  const handleGroupSelect = async (e) => {
    const groupId = e.target.value;

    setSelectedGroup(groupId);

    if (groupId) {
      try {
        const response = await axios.get(
          `${baseUrl}/api/wooms/${groupId}/info`,
          {
            withCredentials: true,
          }
        );
        setUsers(response.data.userInfoDtoList);
      } catch (error) {
        console.error(error);
      }
    } else {
      setUsers([]);
    }
  };

  const handleUserSelect = (e) => {
    const selectedUserUuid = e.target.value;
    const selectedUser = users.find((user) => user.uuid === selectedUserUuid);

    onChange(selectedUser);
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <select id='groupName' onChange={handleGroupSelect}>
          <option value=''>그룹 선택</option>
          {groups.map((group) => (
            <option key={group.woomsId} value={group.woomsId}>
              {group.woomsTitle}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select id='userName' onChange={handleUserSelect}>
          <option value=''>유저 선택</option>
          {users.map((user) => (
            <option key={user.uuid} value={user.uuid}>
              {user.nickname}
            </option>
          ))}
        </select>
      </div>
      <Button label={'편지 쓰기'} onClick={onNext}></Button>
    </Modal>
  );
};

export default ChooseUser;
