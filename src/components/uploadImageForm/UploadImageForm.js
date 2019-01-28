import React, { Component, createRef } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import carouselOperations from '../../redux/carouselImagesOperations';
import styles from './UploadImageForm.module.css';
import sendIcon from './send.png';

const INITIAL_STATE = {
  legend: '',
  redirect: '',
  image: null,
};

class UploadImageForm extends Component {
  fileRef = createRef();

  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleChangeImages = event => {
    event.preventDefault();
    return this.setState({
      image: event.target.files[0],
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { history } = this.props;

    const { legend, redirect, image } = this.state;

    const { onAddImageToCarousel } = this.props;

    const formData = new FormData();

    formData.append('file', image, image.name);

    formData.append('legend', legend);

    formData.append('redirectUrl', redirect);

    onAddImageToCarousel(formData);

    this.setState({ ...INITIAL_STATE });

    return history.push({
      pathname: '/carousel-images',
    });
  };

  render() {
    const { legend, redirect, isLoading } = this.state;
    return (
      <div>
        {isLoading && (
          <Loader type="Watch" color="#00BFFF" height="40" width="40" />
        )}
        <label className={styles.row}>
          <span className={styles.spanLabel}>Legend</span>
          <input
            className={styles.input}
            onChange={this.handleChange}
            type="text"
            name="legend"
            value={legend}
            placeholder="Short description of image"
          />
        </label>
        <label className={styles.row}>
          <span className={styles.spanLabel}>Redirect url</span>
          <input
            className={styles.input}
            onChange={this.handleChange}
            type="text"
            name="redirect"
            value={redirect}
            placeholder="Enter as: /example-to-redirect/"
          />
        </label>
        <label className={styles.row}>
          <span className={styles.spanLabel}>Title Image</span>
          <input
            className={styles.input}
            onChange={this.handleChangeImages}
            type="file"
            name="image"
            ref={this.fileRef}
          />
        </label>
        <label className={styles.row}>
          <button
            className={styles.submitBtn}
            onClick={this.handleSubmit}
            type="submit"
          >
            <img className={styles.buttonIcon} src={sendIcon} alt="send_icon" />
            Submit
          </button>
        </label>
      </div>
    );
  }
}
const mstp = state => ({
  isLoading: state.isLoading,
});

const mdtp = {
  onAddImageToCarousel: carouselOperations.addImageItem,
};

export default connect(
  mstp,
  mdtp,
)(UploadImageForm);
