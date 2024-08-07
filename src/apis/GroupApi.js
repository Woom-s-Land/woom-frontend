import { data } from 'autoprefixer';
import basicAxios from '../libs/axios/basicAxios';

const getMyGroup = async () => {
  const data = await basicAxios({
    method: 'get',
    url: '/wooms',
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};
const getRequestUser = async (woomsId, page) => {
  const data = await basicAxios({
    method: 'get',
    url: `/wooms/${woomsId}/enrollment?page=${page}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const getGroupInfo = async (woomsId) => {
  const data = await basicAxios({
    method: 'get',
    url: `/wooms/${woomsId}/info`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const getGroupTitle = async (inviteCode) => {
  const data = await basicAxios({
    method: 'get',
    url: `/wooms/${inviteCode}/name`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};
const makeGroup = async (woomsTitle) => {
  const data = await basicAxios({
    method: 'post',
    url: '/wooms',
    data: {
      woomsTitle: woomsTitle,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const requestGroup = async (inviteCode) => {
  const data = await basicAxios({
    method: 'post',
    url: `/wooms/${inviteCode}/users`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const responseRequest = async (woomsId, uuid) => {
  const data = await basicAxios({
    method: 'patch',
    url: `/wooms/${woomsId}/users/${uuid}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const changeGroupColor = async (woomsId, color) => {
  const data = await basicAxios({
    method: 'patch',
    url: `/wooms/${woomsId}/colors/${color}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

const delegateAdmin = async (woomsId, uuid) => {
  const data = await basicAxios({
    method: 'patch',
    url: `/wooms/${woomsId}/admins/delegations?userUuid=${uuid}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
const GroupApi = {
  getMyGroup,
  getGroupTitle,
  getRequestUser,
  getGroupInfo,
  makeGroup,
  requestGroup,
  responseRequest,
  changeGroupColor,
  delegateAdmin,
};
export default GroupApi;
