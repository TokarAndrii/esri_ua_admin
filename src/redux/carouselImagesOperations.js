import axios from 'axios';
import carouselActions from './carouselActions';

const fetchCarouselImagesList = () => dispatch => {
  dispatch(carouselActions.FETCH_START());
  axios.get('http://192.168.0.53:9091/api/v1/headers_images/all').then(resp => {
    dispatch(carouselActions.FETCH_SUCCESS_CAROUSEL_IMAGES_LIST(resp.data));
  });
};

const deleteImage = id => dispatch => {
  dispatch(carouselActions.FETCH_START());

  axios
    .delete(`http://192.168.0.53:9091/api/v1/image_header/delete/${id}`)
    .then(resp => {
      if (resp.status === 200) {
        dispatch(carouselActions.FETCHSUCCESS_CAROUSEL_IMAGE_DELETE_ITEM(id));
      }
    })
    /* eslint-disable-next-line */
    .catch(error => console.log(error.response.data, ' - error.response.data'));
};

const addImageItem = formData => dispatch => {
  dispatch(carouselActions.FETCH_START());

  fetch('http://192.168.0.53:9091/api/v1/header_images/create/', {
    method: 'POST',
    body: formData,
    headers: {
      Expect: '100-continue',
    },
  }).then(resp => {
    if (resp.status === 201) {
      return resp.json().then(data => {
        const { id, legend, redirect, imageUrl } = data;

        const item = {
          id,
          legend,
          imageUrl,
          redirect,
        };
        return dispatch(
          carouselActions.FETCH_ADD_SUCCESS_CAROUSEL_IMAGE_ITEM(item),
        );
      });
    }
    return null;
  });
};

export default {
  fetchCarouselImagesList,
  deleteImage,
  addImageItem,
};
