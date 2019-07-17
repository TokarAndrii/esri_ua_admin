import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import authOperations from '../../redux/operations/authOperations';

import PrivateRoute from '../privateRoute/PrivateRoute';
import AddNewsPage from '../../pages/addNewsPage/AddNewsPage';
import HomePage from '../../pages/home/HomePage';
import EditNewsPage from '../../pages/editNews/EditNewsPage';
import CarouselMenupage from '../../pages/carouselMenuPage/CarouselMenuPage';
import LogInPage from '../../pages/login/LogInPage';
import CarouselUploadImagePage from '../../pages/carouselUploadImagePage/CarouselUploadImagePage';

import carouselMenuIcon from './carouselMenu.png';
import homeIcon from './home2.png';
import styles from './App.module.css';
import logout from './log-out.png';

class App extends Component {
  componentDidMount() {
    const { refreshCurrentUser } = this.props;
    refreshCurrentUser();
  }

  render() {
    const { location, isAuthenticated, handleLogOut } = this.props;
    return (
      <div className={styles.app}>
        {isAuthenticated && (
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
            <button
              type="button"
              onClick={handleLogOut}
              className={styles.logOutBtn}
            >
              <img src={logout} alt="logout" />
              Log Out
            </button>
          </header>
        )}

        <Switch>
          {/* <Route exact path="/" component={HomePage} /> */}
          <PrivateRoute
            exact
            path="/"
            redirectTo="/log-in"
            component={HomePage}
          />
          <PrivateRoute
            path="/add-news"
            redirectTo="/log-in"
            component={AddNewsPage}
          />
          {/* <Route path="/add-news" component={AddNewsPage} /> */}
          <PrivateRoute
            exact
            path="/carousel-images"
            redirectTo="/log-in"
            component={CarouselMenupage}
          />
          {/* <Route exact path="/carousel-images" component={CarouselMenupage} /> */}
          <PrivateRoute
            exact
            path="/carousel-images/upload"
            redirectTo="/log-in"
            component={CarouselUploadImagePage}
          />
          {/* <Route
            path="/carousel-images/upload"
            component={CarouselUploadImagePage}
          /> */}
          <Route path="/edit-news/:id" component={EditNewsPage} />
          <Route path="/log-in" component={LogInPage} />
        </Switch>
      </div>
    );
  }
}

const mstp = state => ({
  isLoading: state.isLoading,
  isAuthenticated: state.session.isAuthenticated,
});

const mdtp = {
  refreshCurrentUser: authOperations.refreshCurrentUser,
  handleLogOut: authOperations.logOut,
};

export default connect(
  mstp,
  mdtp,
)(App);
