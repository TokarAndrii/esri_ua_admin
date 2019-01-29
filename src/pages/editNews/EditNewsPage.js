import React, { Component, createRef } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import deleteIcon from './delete.png';
import styles from './EditnewsPage.module.css';
import send from './send.png';

const INITIAL_STATE = {
  title: '',
  preview: '',
  content: '',
  titleImage: null,
  titleImageNew: null,
  imagesArray: [],
  newsImages: [],
  showEditText: true,
  isLoading: false,
  isError: false,
};

class EditNewsPage extends Component {
  state = { ...INITIAL_STATE };

  filesRef = createRef();

  fileRef = createRef();

  componentDidMount() {
    const { match } = this.props;

    const { id } = match.params;

    this.setState({ isLoading: true });

    axios
      .get(`http://192.168.0.53:9091/api/v1/news/${id}`)
      .then(resp => {
        // headerImage
        const { title, preview, content, newsImages } = resp.data.news;

        // const titleImage = newsImages.filter(curr => curr.headerImage)[0];

        return this.setState({
          title,
          preview,
          content,
          newsImages,
          isLoading: false,
        });
      })
      .catch(() =>
        this.setState({
          isError: 'Помилка при завантаженні новин із серверу!',
        }),
      );
  }

  handleChangeImages2 = event => {
    event.preventDefault();
    return this.setState({
      titleImageNew: event.target.files[0],
    });
  };

  handleChangeImages = ({ target }) => {
    const { files } = target;
    this.setState({ imagesArray: files });
  };

  handleSubmitEditText = e => {
    e.preventDefault();
    const { title, preview, content } = this.state;

    const { match } = this.props;

    const { id } = match.params;

    axios
      .post(`http://192.168.0.53:9091/api/v1/news/update/${id}`, {
        title,
        preview,
        content,
      })
      .catch(error => {
        /* eslint-disable-next-line */
        console.log(error.response.data);
        return this.setState({
          isError: 'Помилка при завантаженні новин із серверу!',
        });
      });
  };

  handleDeleteOneImage = id => {
    axios
      .delete(`http://192.168.0.53:9091/api/v1/image/delete/${id}`)
      .then(() => {
        const { match } = this.props;

        this.setState({ isLoading: true });

        axios
          .get(`http://192.168.0.53:9091/api/v1/news/${match.params.id}`)
          .then(res => {
            const { title, preview, content, newsImages } = res.data.news;
            return this.setState({
              title,
              preview,
              content,
              newsImages,
              isLoading: false,
            });
          });
      })
      .catch(error => {
        /* eslint-disable-next-line */
        console.log(error.response.data, ' - error.response.data ');
        return this.setState({
          isError: 'Помилка при видаленні новини із серверу!',
        });
      });

    const { history, match } = this.props;

    return history.push({
      pathname: `/edit-news/${match.params.id}`,
    });
  };

  handleSubmitEditImages = e => {
    e.preventDefault();
    const { imagesArray, titleImageNew /* titleImage */ } = this.state;
    const formData = new FormData();
    const { match } = this.props;

    const { id } = match.params;

    if (titleImageNew !== null) {
      formData.append('files', titleImageNew, titleImageNew.name);
      formData.append('titleImageName', titleImageNew.name);
    }

    if (imagesArray.length > 0) {
      Array.from(imagesArray).map(current => {
        formData.append('files', current, current.name);

        return null;
      });
    }

    this.setState({ isLoading: true });

    fetch(`http://192.168.0.53:9091/api/v1/image/update/${id}`, {
      method: 'POST',
      body: formData,
      headers: {
        Expect: '100-continue',
      },
    })
      .then(() => {
        axios
          .get(`http://192.168.0.53:9091/api/v1/news/${match.params.id}`)
          .then(res => {
            const { title, preview, content, newsImages } = res.data.news;
            // const titleImage2 = newsImages.filter(curr => curr.headerImage)[0];

            return this.setState({
              title,
              preview,
              content,
              newsImages,
              isLoading: false,
            });
          });
      })
      .catch(err => {
        /* eslint-disable-next-line */
        console.log(err.message, ' - err at fetch at handleSubmitEditImages');
        return this.setState({
          isError: 'Помилка при обновленні новини новини із серверу!',
        });
      });

    this.filesRef.current.value = '';
    this.fileRef.current.value = '';
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  toggle = () =>
    this.setState(state => ({ showEditText: !state.showEditText }));

  render() {
    const {
      title,
      preview,
      content,
      showEditText,
      newsImages,
      isLoading,
      isError,
    } = this.state;

    return (
      <div className={styles.holder}>
        <h2 className={styles.header}>Edit News Page</h2>

        <div className={styles.tabsTitleHolder}>
          <span
            className={showEditText ? styles.activeTabTitle : styles.tabsTitle}
            onClick={this.toggle}
            onKeyPress={() => null}
            role="button"
            tabIndex="0"
          >
            Edit text
          </span>
          <span
            className={showEditText ? styles.tabsTitle : styles.activeTabTitle}
            onClick={this.toggle}
            onKeyPress={() => null}
            role="button"
            tabIndex="0"
          >
            Edit pictures
          </span>
        </div>
        {isLoading && !isError && (
          <Loader type="Watch" color="#00BFFF" height="40" width="40" />
        )}

        {isError && <div className={styles.error}>{isError}</div>}

        {showEditText && !isError && (
          <div>
            <label className={styles.row}>
              <span className={styles.spanLabel}>Title</span>
              <input
                className={styles.input}
                onChange={this.handleChange}
                type="text"
                name="title"
                value={title}
              />
            </label>
            <label className={styles.row}>
              <span className={styles.spanLabel}>Preview Content</span>
              <textarea
                className={styles.input}
                cols="150"
                rows="10"
                onChange={this.handleChange}
                type="text"
                name="preview"
                value={preview}
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
                rows="40"
                value={content}
              />
            </label>
            <button
              className={styles.submitBtn}
              type="button"
              onClick={this.handleSubmitEditText}
            >
              <img className={styles.buttonIcon} src={send} alt="send_icon1" />
              Submit Edit Text
            </button>
          </div>
        )}

        {!showEditText && !isError && (
          <div>
            {newsImages &&
              newsImages.map(curr => (
                // <span className={styles.imageLink} key={curr.id}>
                //   image{curr.id}
                // </span>

                <div key={curr.id} className={styles.imageHolder}>
                  {curr.headerImage ? (
                    <span className={styles.spanLabel}>Title Images</span>
                  ) : (
                    <span className={styles.spanLabel}>Other Images</span>
                  )}
                  <img
                    key={curr.id}
                    className={styles.image}
                    src={curr.imageUrl}
                    alt={`image_news_${curr.id}`}
                  />
                  <button
                    className={styles.btnImageDelete}
                    type="button"
                    onClick={() => this.handleDeleteOneImage(curr.id)}
                  >
                    <img
                      src={deleteIcon}
                      alt="delete_news_icon"
                      className={styles.addNewsPageLinkIcon}
                    />
                    Delete Image
                  </button>
                </div>
              ))}
            <label className={styles.row}>
              <span className={styles.spanLabel}>New Title Image</span>
              <input
                className={styles.input}
                onChange={this.handleChangeImages2}
                type="file"
                name="titleImageNew"
                ref={this.fileRef}
              />
            </label>
            <label className={styles.row}>
              <span className={styles.spanLabel}>Add to Other Images</span>
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
              onClick={this.handleSubmitEditImages}
              type="submit"
            >
              <img className={styles.buttonIcon} src={send} alt="send_icon1" />
              Submit Edit Pictures
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default EditNewsPage;
