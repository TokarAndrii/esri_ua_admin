import React, { Component, createRef } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaListOl,
  FaListUl,
  FaItalic,
  FaLink,
  FaRedoAlt,
  FaUndoAlt,
  FaBold,
  FaStrikethrough,
  FaEraser,
  FaHeading,
} from 'react-icons/fa';
import Button from '../../components/button/Button';
import deleteIcon from './delete.png';
import styles from './EditnewsPage.module.css';
import send from './send.png';
import apiConfig from '../../config';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// eslint-disable-next-line
const sanitizeConf = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'p',
    'a',
    'ul',
    'ol',
    'nl',
    'li',
    'b',
    'i',
    'strong',
    'em',
    'strike',
    'code',
    'hr',
    'br',
    'div',
    'table',
    'thead',
    'caption',
    'tbody',
    'tr',
    'th',
    'td',
    'pre',
    'iframe',
  ],
  allowedAttributes: {
    a: ['href'],
    '*': ['align', 'text-align', 'style'],
  },
  allowedStyles: {
    '*': {
      'text-align': [/^left$/, /^right$/, /^center$/],
      align: [/^left$/, /^right$/, /^center$/],
    },
  },
};

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
  editable: true,
  link: '',
  formatblock: '',
};

class EditNewsPage extends Component {
  state = { ...INITIAL_STATE };

  filesRef = createRef();

  fileRef = createRef();

  componentDidMount() {
    const { match, authToken } = this.props;

    const { id } = match.params;

    this.setState({ isLoading: true });

    setAuthHeader(authToken);

    axios
      .get(
        `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
          apiConfig.apiRootUrl
        }/news/${id}`,
      )
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

  handleChangeHtml = evt => {
    this.setState({ content: evt.target.value });
  };

  handleChangeHtml2 = evt => {
    this.setState({ preview: evt.target.value });
  };

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

    const { match, authToken } = this.props;

    const { id } = match.params;

    axios
      .post(
        `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
          apiConfig.apiRootUrl
        }/news/update/${id}`,
        {
          title,
          preview,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
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
      .delete(
        `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
          apiConfig.apiRootUrl
        }/image/delete/${id}`,
      )
      .then(() => {
        const { match } = this.props;

        this.setState({ isLoading: true });

        axios
          .get(
            `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
              apiConfig.apiRootUrl
            }/news/${match.params.id}`,
          )
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
    const { match, authToken } = this.props;

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

    fetch(
      `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
        apiConfig.apiRootUrl
      }/image/update/${id}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Expect: '100-continue',
          Authorization: `Bearer ${authToken}`,
        },
      },
    )
      .then(() => {
        axios
          .get(
            `${apiConfig.proptocol}://${apiConfig.ip}:${apiConfig.port}/${
              apiConfig.apiRootUrl
            }/news/${match.params.id}`,
          )
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

  sanitize = () => {
    this.setState({
      // eslint-disable-next-line
      content: sanitizeHtml(this.state.content, this.sanitizeConf),
    });
  };

  sanitize2 = () => {
    this.setState({
      // eslint-disable-next-line
      preview: sanitizeHtml(this.state.preview, this.sanitizeConf),
    });
  };

  toggle = () =>
    this.setState(state => ({ showEditText: !state.showEditText }));

  toggleEditable = () => {
    const { editable } = this.state;
    this.setState({ editable: !editable });
  };

  render() {
    const {
      title,
      preview,
      content,
      showEditText,
      newsImages,
      isLoading,
      isError,
      link,
      formatblock,
      editable,
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
        <div className={styles.toolBar}>
          <Button className={styles.btn} cmd="bold">
            <FaBold />
          </Button>
          <label className={styles.label}>
            Link target:
            <input
              className={styles.linkInput}
              name="link"
              value={link}
              onChange={this.handleChange}
            />
          </label>

          <Button
            className={styles.btn}
            cmd="createLink"
            arg={link}
            name="hyperlink"
          >
            <FaLink />
          </Button>

          <Button className={styles.btn} cmd="italic">
            <FaItalic />
          </Button>
          <Button className={styles.btn} cmd="insertOrderedList">
            <FaListOl />
          </Button>
          <Button className={styles.btn} cmd="insertUnorderedList">
            <FaListUl />
          </Button>
          <Button className={styles.btn} cmd="strikeThrough">
            <FaStrikethrough />
          </Button>
          <Button className={styles.btn} cmd="justifyLeft">
            <FaAlignLeft />
          </Button>
          <Button className={styles.btn} cmd="justifyCenter">
            <FaAlignCenter />
          </Button>

          <Button className={styles.btn} cmd="justifyRight">
            <FaAlignRight />
          </Button>
          <Button className={styles.btn} cmd="removeFormat">
            <FaEraser />
          </Button>
          <Button className={styles.btn} cmd="undo">
            <FaRedoAlt />
          </Button>
          <Button className={styles.btn} cmd="redo">
            <FaUndoAlt />
          </Button>
          <label className={styles.label}>
            {/* eslint-disable-next-line */}
            <select
              className={styles.select}
              name="formatblock"
              onChange={this.handleChange}
              value={formatblock}
            >
              <option
                className={styles.formatBlockOption}
                key="default"
                value=""
              >
                choose from list
              </option>
              <option className={styles.formatBlockOption} key="H1" value="H1">
                H1
              </option>
              <option className={styles.formatBlockOption} key="H2" value="H2">
                H2
              </option>
              <option className={styles.formatBlockOption} key="H3" value="H3">
                H3
              </option>
              <option className={styles.formatBlockOption} key="H4" value="H4">
                H4
              </option>
              <option className={styles.formatBlockOption} key="H5" value="H5">
                H5
              </option>
              <option className={styles.formatBlockOption} key="H6" value="H6">
                H6
              </option>
            </select>
            <Button className={styles.btn} cmd="formatblock" arg={formatblock}>
              <FaHeading />
            </Button>
          </label>

          <button
            type="button"
            onClick={this.toggleEditable}
            className={styles.btn2}
          >
            Make {editable ? 'readonly' : 'editable'}
          </button>
        </div>

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
              <ContentEditable
                className={styles.editable}
                tagName="pre"
                html={preview} // innerHTML of the editable div
                disabled={!editable} // use true to disable edition
                onChange={this.handleChangeHtml2} // handle innerHTML change
                onBlur={this.sanitize2}
              />
            </label>
            {/* <label className={styles.row}>
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
            </label> */}
            {/* <label className={styles.row}>
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
            </label> */}
            <label className={styles.row}>
              <span className={styles.spanLabel}>Content</span>
              <ContentEditable
                className={styles.editable}
                tagName="pre"
                html={content} // innerHTML of the editable div
                disabled={!editable} // use true to disable edition
                onChange={this.handleChangeHtml} // handle innerHTML change
                onBlur={this.sanitize}
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

const mstp = state => ({
  authToken: state.session.authToken,
});

export default connect(mstp)(EditNewsPage);
