import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import homeIcon from './home2.png';
import styles from './EditnewsPage.module.css';

const INITIAL_STATE = {
  title: '',
  preview: '',
  content: '',
  titleImage: null,
  imagesArray: [],
  newsImages: [],
  showEditText: true,
};

class EditNewsPage extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const { match } = this.props;

    const { id } = match.params;

    axios.get(`http://192.168.0.53:9091/api/v1/news/${id}`).then(resp => {
      const { title, preview, content, newsImages } = resp.data.news;
      return this.setState({
        title,
        preview,
        content,
        newsImages,
      });
    });

    // axios
    //   .post(`http://192.168.0.53:9091/api/v1/news/update/${id}`)
    //   .then(resp => console.log(resp, ' - resp at EditNewsPage'));
  }

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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  toggle = () =>
    this.setState(state => ({ showEditText: !state.showEditText }));

  render() {
    const { title, preview, content, showEditText, newsImages } = this.state;
    return (
      <div className={styles.holder}>
        <Link to="/" className={styles.addNewsPageLinkHolder}>
          <img
            src={homeIcon}
            alt="add_news_icon"
            className={styles.addNewsPageLinkIcon}
          />
          <span className={styles.addNewstext}> Home</span>
        </Link>
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
                  <img
                    key={curr.id}
                    className={styles.image}
                    src={curr.imageUrl}
                    alt={`image_news_${curr.id}`}
                  />
                  <button className={styles.btnImageDelete} type="button">
                    Delete Image
                  </button>
                </div>
              ))}
            <button
              className={styles.submitBtn}
              onClick={this.handleSubmit}
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
