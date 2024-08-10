import basicAxios from '../libs/axios/basicAxios';

const getMyGroup = async (page) => {
  try {
    const res = await basicAxios({
      method: 'get',
      url: `/wooms?page=${page}`,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const getRequestUser = async (woomsId, page) => {
  try {
    const res = await basicAxios({
      method: 'get',
      url: `/wooms/${woomsId}/enrollment?page=${page}`,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const getGroupInfo = async (woomsId) => {
  try {
    const res = await basicAxios({
      method: 'get',
      url: `/wooms/${woomsId}/info`,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const getGroupTitle = async (inviteCode) => {
  try {
    const res = await basicAxios({
      method: 'get',
      url: `/wooms/${inviteCode}/name`,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const createGroup = async (woomsTitle) => {
  try {
    const res = await basicAxios({
      method: 'post',
      url: '/wooms',
      data: {
        woomsTitle: woomsTitle,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const requestGroup = async (inviteCode) => {
  try {
    const res = await basicAxios({
      method: 'post',
      url: `/wooms/${inviteCode}/users`,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const responseRequest = async (woomsId, uuid, status) => {
  try {
    const res = await basicAxios({
      method: 'patch',
      url: `/wooms/${woomsId}/users/${uuid}`,
      data: {
        status: status,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const changeGroupColor = async (woomsId, color) => {
  try {
    const res = await basicAxios({
      method: 'patch',
      url: `/wooms/${woomsId}/colors/${color}`,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const isAdmin = async (woomsId) => {
  try {
    const res = await basicAxios({
      method: 'get',
      url: `/wooms/${woomsId}/admin`,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const delegateAdmin = async (woomsId, uuid) => {
  try {
    const res = await basicAxios({
      method: 'patch',
      url: `/wooms/${woomsId}/admins/delegations`,
      data: { userUuid: uuid },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const withdraw = async (woomsId) => {
  try {
    const res = await basicAxios({
      method: 'delete',
      url: `/wooms/${woomsId}/users`,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const GroupApi = {
  getMyGroup,
  getGroupTitle,
  getRequestUser,
  getGroupInfo,
  createGroup,
  requestGroup,
  responseRequest,
  changeGroupColor,
  delegateAdmin,
  withdraw,
  isAdmin,
};
export default GroupApi;
