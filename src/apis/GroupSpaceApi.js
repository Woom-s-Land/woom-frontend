import basicAxios from '../libs/axios/basicAxios';

const getComment = async (woomsId, page) => {
  const data = await basicAxios({
    method: 'get',
    url: `comments/wooms/${woomsId}?page=${page}`,
  })
    .then((res) => {
      console.log(123);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const postComment = async (woomsId, content) => {
  const data = await basicAxios({
    method: 'post',
    url: `/comments/wooms/${woomsId}`,
    data: {
      content: content,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
  return data;
};

const getCommentToday = async (woomsId) => {
  const data = await basicAxios({
    method: 'get',
    url: `/comments/wooms/${woomsId}/today`,
  })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log('오늘 실패');
      console.log(err.message);
      return err;
    });
  return data;
};

const getStory = async (woomsId, page) => {
  const data = await basicAxios({
    method: 'get',
    url: `/wooms/${woomsId}/stories?page=${page}`,
  })
    .then((res) => {
      console.log('사연 읽기');
      return res.data;
    })
    .catch((err) => {
      console.log('사연 읽기');
      return err;
    });
  return data;
};

const postStory = async (woomsId, userNickname, content) => {
  const data = await basicAxios({
    method: 'post',
    url: `/wooms/${woomsId}/stories`,
    data: {
      userNickname: userNickname,
      content: content,
    },
    withCredentials: true,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const postPhoto = async (woomsId, mapId, imageFile) => {
  const formData = new FormData();
  formData.append('mapId', mapId);
  formData.append('summary', '');
  formData.append('image', imageFile);

  try {
    const response = await basicAxios({
      method: 'post',
      url: `wooms/${woomsId}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

const getPhotoMonth = async (woomsId, page) => {
  const data = await basicAxios({
    method: 'get',
    url: `wooms/${woomsId}/photos/month?page=${page}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const getPhoto = async (woomsId, page, date) => {
  const data = await basicAxios({
    method: 'get',
    url: `/wooms/${woomsId}/photos?page=${page}`,
    params: {
      date: date,
    },
  })
    .then((res) => {
      console.log('사진 아이템 모달', res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(123123);
      return err;
    });
  return data;
};

const getPhotoDetail = async (woomsId, photoId) => {
  const data = await basicAxios({
    method: 'get',
    url: `wooms/${woomsId}/photos/${photoId}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('디테일페이지 실패');
      return err;
    });
  return data;
};

const patchPhoto = async (woomsId, photoId) => {
  const data = await basicAxios({
    method: 'get',
    url: `wooms/${woomsId}/photos/${photoId}`,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return data;
};

const GroupCommentApi = {
  getComment,
  postComment,
  getCommentToday,
};

const GroupStoryApi = {
  getStory,
  postStory,
};

const GroupPhotoApi = {
  postPhoto,
  getPhoto,
  getPhotoMonth,
  getPhotoDetail,
  patchPhoto,
};

export { GroupCommentApi, GroupPhotoApi, GroupStoryApi };
