import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import newsOperations from '../../redux/newsOperations';
import styles from './NewsForm.module.css';

const INITIAL_STATE = {
  title: '',
  preview: '',
  content: '',
  titleImage: null,
  imagesArray: [],
};

class NewsForm extends Component {
  fileRef = createRef();

  filesRef = createRef();

  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleChangeImages = ({ target }) => {
    const { files } = target;
    // this.inputRef.current.value = '';
    this.setState({ imagesArray: files });
  };

  handleChangeImages2 = event => {
    event.preventDefault();
    return this.setState({
      titleImage: event.target.files[0],
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { history } = this.props;

    const { title, preview, content, titleImage, imagesArray } = this.state;

    const { addNote } = this.props;

    if (
      title === '' ||
      preview === '' ||
      content === '' ||
      titleImage === null
    ) {
      alert('input all fields');
      return null;
    }
    const formData = new FormData();

    formData.append('files', titleImage, titleImage.name);

    Array.from(imagesArray).map(current => {
      formData.append('files', current, current.name);

      return null;
    });

    addNote(title, preview, content, formData);

    this.fileRef.current.value = '';
    this.filesRef.current.value = '';

    this.setState({ ...INITIAL_STATE });

    return history.push({
      pathname: '/',
    });
  };

  render() {
    return (
      <>
        <label className={styles.row}>
          <span className={styles.spanLabel}>Title</span>
          <input
            className={styles.input}
            onChange={this.handleChange}
            type="text"
            name="title"
          />
        </label>
        <label className={styles.row}>
          <span className={styles.spanLabel}>Preview Content</span>
          <textarea
            className={styles.input}
            cols="150"
            rows="3"
            onChange={this.handleChange}
            type="text"
            name="preview"
          />
        </label>
        <label className={styles.row}>
          <span className={styles.spanLabel}>Content</span>
          <textarea
            className={styles.input}
            onChange={this.handleChange}
            type="text"
            name="content"
            cols="150"
            rows="10"
          />
        </label>
        <label className={styles.row}>
          <span className={styles.spanLabel}>Title Image</span>
          <input
            className={styles.input}
            onChange={this.handleChangeImages2}
            type="file"
            name="titleImage"
            ref={this.fileRef}
          />
        </label>
        <label className={styles.row}>
          <span className={styles.spanLabel}>Other Images</span>
          <input
            className={styles.input}
            onChange={this.handleChangeImages}
            type="file"
            name="imagesArray"
            ref={this.filesRef}
            multiple
          />
        </label>
        <button
          className={styles.submitBtn}
          onClick={this.handleSubmit}
          type="submit"
        >
          <img className={styles.buttonIcon} src="./send.png" alt="send_icon" />
          Submit
        </button>
      </>
    );
  }
}
const mdtp = {
  addNote: newsOperations.addNewsAndImages,
};

export default connect(
  null,
  mdtp,
)(NewsForm);
