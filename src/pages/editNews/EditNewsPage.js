import React, { Component, createRef } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import deleteIcon from './delete.png';
import styles from './EditnewsPage.module.css';

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
};

class EditNewsPage extends Component {
  state = { ...INITIAL_STATE };

  filesRef = createRef();

  componentDidMount() {
    const { match } = this.props;

    const { id } = match.params;

    this.setState({ isLoading: true });

    axios.get(`http://192.168.0.53:9091/api/v1/news/${id}`).then(resp => {
      // headerImage
      const { title, preview, content, newsImages } = resp.data.news;

      const titleImage = newsImages.filter(curr => curr.headerImage)[0];

      return this.setState({
        title,
        preview,
        content,
        newsImages,
        titleImage,
        isLoading: false,
      });
    });

    // axios
    //   .post(`http://192.168.0.53:9091/api/v1/news/update/${id}`)
    //   .then(resp => console.log(resp, ' - resp at EditNewsPage'));
  }

  handleChangeImages2 = event => {
    event.preventDefault();
    return this.setState({
      titleImageNew: event.target.files[0],
    });
  };

  handleChangeImages = ({ target }) => {
    const { files } = target;
    // this.inputRef.current.value = '';
    this.setState({ imagesArray: files });
  };

  handleSubmitEditText = e => {
    e.preventDefault();
    const { title, preview, content } = this.state;

    const { match } = this.props;

    const { id } = match.params;

    axios.post(`http://192.168.0.53:9091/api/v1/news/update/${id}`, {
      title,
      preview,
      content,
    });
    //   .then(resp => console.log(resp, ' - resp news/update/'))
    //   .catch(error => console.log(error.response.data));
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
      .catch(error =>
        /* eslint-disable-next-line */
        console.log(error.response.data, ' - error.response.data '),
      );

    const { history, match } = this.props;

    return history.push({
      pathname: `/edit-news/${match.params.id}`,
    });
  };

  handleSubmitEditImages = e => {
    e.preventDefault();
    const { imagesArray, titleImageNew, titleImage } = this.state;
    const formData = new FormData();
    const { match } = this.props;

    const { id } = match.params;

    if (titleImage === null || titleImage === undefined) {
      formData.append('files', titleImageNew, titleImageNew.name);
    }

    Array.from(imagesArray).map(current => {
      formData.append('files', current, current.name);

      return null;
    });

    this.setState({ isLoading: true });

    fetch(`http://192.168.0.53:9091/api/v1/image/upload/${id}`, {
      method: 'POST',
      body: formData,
      headers: {
        Expect: '100-continue',
      },
    }).then(() => {
      axios
        .get(`http://192.168.0.53:9091/api/v1/news/${match.params.id}`)
        .then(res => {
          const { title, preview, content, newsImages } = res.data.news;
          const titleImage2 = newsImages.filter(curr => curr.headerImage)[0];

          return this.setState({
            title,
            preview,
            content,
            newsImages,
            titleImage: titleImage2,
            isLoading: false,
          });
        });
    });

    // this.fileRef.current.value = '';
    this.filesRef.current.value = '';
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
        {isLoading && (
          <Loader type="Watch" color="#00BFFF" height="40" width="40" />
        )}

        {showEditText && (
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
              {/* <img
            className={styles.buttonIcon}
            src="./send.png"
            alt="send_icon1"
          /> */}
              Submit Edit Text
            </button>
          </div>
        )}

        {!showEditText && (
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
              {/* <img
            className={styles.buttonIcon}
            src="./send.png"
            alt="send_icon1"
          /> */}
              Submit Edit Pictures
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default EditNewsPage;
