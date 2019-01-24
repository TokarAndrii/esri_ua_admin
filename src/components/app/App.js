import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AddNewsPage from '../../pages/addNewsPage/AddNewsPage';
import HomePage from '../../pages/home/HomePage';
import styles from './App.module.css';

class App extends Component {
  componentDidMount() {}

  render() {
    const { isLoading, location } = this.props;
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h2>Wellcome to Admin page ESRI.UA</h2>

          {location.pathname === '/' && (
            <Link to="/add-news" className={styles.addNewsPageLinkHolder}>
              <img
                src="./add.png"
                alt="add_news_icon"
                className={styles.addNewsPageLinkIcon}
              />
              <span className={styles.addNewstext}>Add News</span>
            </Link>
          )}

          {location.pathname === '/add-news' && (
            <Link to="/" className={styles.addNewsPageLinkHolder}>
              <img
                src="./home2.png"
                alt="add_news_icon"
                className={styles.addNewsPageLinkIcon}
              />
              <span className={styles.addNewstext}>Home</span>
            </Link>
          )}
        </header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/add-news" component={AddNewsPage} />
        </Switch>
        {isLoading && (
          <Loader type="Watch" color="#00BFFF" height="40" width="40" />
        )}
      </div>
    );
  }
}

const mstp = state => ({
  isLoading: state.isLoading,
});

export default connect(mstp)(App);
