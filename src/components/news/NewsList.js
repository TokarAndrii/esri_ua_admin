import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
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
    const { newsList, onDeleteNewsItem, isLoading } = this.props;
    return (
      <div className={styles.list}>
        {isLoading && (
          <Loader type="Watch" color="#00BFFF" height="40" width="40" />
        )}
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
  isLoading: state.isLoading,
});
const mdtp = {
  fetchNewsList: newsOperations.fetchNewsList,
  onDeleteNewsItem: newsOperations.deleteNews,
};

export default connect(
  mstp,
  mdtp,
)(NewsList);
