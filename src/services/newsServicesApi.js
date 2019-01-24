import axios from 'axios';
import qs from 'qs';

const deleteByIdNewsItem = id =>
  axios
    .delete(`http://192.168.0.53:9091/api/v1/news/delete/${id}`)
    .then(resp => resp.status === 200);

const getByIdNewsItem = id =>
  axios
    .get(`http://192.168.0.53:9091/api/v1/news/${id}`)
    .then(resp => resp.data);

const createNewsItem = (title, preview, content) =>
  // const options = {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //   },
  // };

  axios
    .post(
      `http://192.168.0.53:9091/api/v1/news/create/`,
      qs.stringify({ title, preview, content }),
    )

    .then(resp => resp.data)
    .catch(err => err);
const createImages = (formData, id) => {
  console.log(id, ' -id');
  fetch(`http://192.168.0.53:9091/api/v1/image/upload/${id}`, {
    method: 'POST',
    body: formData,
  });
};
// axios
//   .post('http://192.168.0.53:9091/api/v1/image/upload/', {
//     formData,
//   })
//   .then(resp => resp.data);

export default {
  deleteByIdNewsItem,
  getByIdNewsItem,
  createNewsItem,
  createImages,
};
