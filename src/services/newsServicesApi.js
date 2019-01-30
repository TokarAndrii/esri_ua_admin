import axios from 'axios';
import qs from 'qs';
import apiConfig from '../config';

const deleteByIdNewsItem = id =>
  axios
    .delete(
      `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
        apiConfig.apiRootUrl
      }/news/delete/${id}`,
    )
    .then(resp => resp.status === 200);

const getByIdNewsItem = id =>
  axios
    .get(
      `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
        apiConfig.apiRootUrl
      }/news/${id}`,
    )
    .then(resp => resp.data);

const createNewsItem = (title, preview, content) =>
  // const options = {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //   },
  // };

  axios
    .post(
      `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
        apiConfig.apiRootUrl
      }/news/create/`,
      qs.stringify({ title, preview, content }),
    )

    .then(resp => resp.data)
    .catch(err => err);
const createImages = (formData, id) => {
  /* eslint-disable-next-line */
  console.log(id, ' -id');
  fetch(
    `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
      apiConfig.apiRootUrl
    }/image/upload/${id}`,
    {
      method: 'POST',
      body: formData,
    },
  );
};

export default {
  deleteByIdNewsItem,
  getByIdNewsItem,
  createNewsItem,
  createImages,
};
