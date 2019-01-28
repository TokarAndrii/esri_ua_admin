import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AddNewsPage from '../../pages/addNewsPage/AddNewsPage';
import HomePage from '../../pages/home/HomePage';
import EditNewsPage from '../../pages/editNews/EditNewsPage';
import CarouselMenupage from '../../pages/carouselMenuPage/CarouselMenuPage';
import LogInPage from '../../pages/login/LogInPage';
import CarouselUploadImagePage from '../../pages/carouselUploadImagePage/CarouselUploadImagePage';

import carouselMenuIcon from './carouselMenu.png';
import homeIcon from './home2.png';
import styles from './App.module.css';

class App extends Component {
  componentDidMount() {}

  render() {
    const { location } = this.props;
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h2>Wellcome to Admin page ESRI.UA</h2>

          <div className={styles.headerMenuHolder}>
            <div className={styles.headerMenu}>
              <Link
                to="/carousel-images"
                className={styles.carouselMenuPageLinkHolder}
              >
                <img
                  src={carouselMenuIcon}
                  alt="carousel_menu_icon"
                  className={styles.addNewsPageLinkIcon}
                />
                <span className={styles.addNewstext}> Carousel Images</span>
              </Link>
            </div>
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

            {location.pathname !== '/' && (
              <Link to="/" className={styles.addNewsPageLinkHolder}>
                <img
                  src={homeIcon}
                  alt="add_news_icon"
                  className={styles.addNewsPageLinkIcon}
                />
                <span className={styles.addNewstext}>Home</span>
              </Link>
            )}
          </div>
        </header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/add-news" component={AddNewsPage} />
          <Route exact path="/carousel-images" component={CarouselMenupage} />
          <Route
            path="/carousel-images/upload"
            component={CarouselUploadImagePage}
          />
          <Route path="/edit-news/:id" component={EditNewsPage} />
          <Route path="/log-in" component={LogInPage} />
        </Switch>
      </div>
    );
  }
}

const mstp = state => ({
  isLoading: state.isLoading,
});

export default connect(mstp)(App);
