import basicAxios from '../libs/axios/basicAxios';

const getMapInfo = async (woomsId) => {
  try {
    const res = await basicAxios({
      method: 'get',
      url: `/wooms/${woomsId}/map`,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

const PhotoApi = {
  getMapInfo,
};
export default PhotoApi;
