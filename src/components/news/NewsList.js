import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewsTable from '../newsTable/NewsTable';
import newsOperations from '../../redux/newsOperations';
import styles from './NewsList.module.css';

class NewsList extends Component {
  componentDidMount() {
    const { fetchNewsList } = this.props;
    fetchNewsList();
  }

  componentDidUpdate(prevProps) {
    // TO DO - remove console logs
    // const { newsList } = prevProps;
    // console.log('prevProps - ', prevProps.newsList.length);
    // console.log('this.props - ', this.props.newsList.length);

    const { newsList } = this.props;

    if (prevProps.newsList.length !== newsList.length) {
      const { fetchNewsList } = this.props;
      fetchNewsList();
    }
  }

  render() {
    const { newsList, onDeleteNewsItem } = this.props;
    return (
      <div className={styles.list}>
        <NewsTable
          newsList={newsList}
          onDelete={onDeleteNewsItem}
          tableClassName={styles.table}
        />
      </div>
    );
  }
}
const mstp = state => ({
  newsList: state.newsList,
});
const mdtp = {
  fetchNewsList: newsOperations.fetchNewsList,
  onDeleteNewsItem: newsOperations.deleteNews,
};

export default connect(
  mstp,
  mdtp,
)(NewsList);
