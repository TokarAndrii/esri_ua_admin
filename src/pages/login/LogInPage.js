import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogInForm from '../../components/loginForm/LogInForm';
import authOperations from '../../redux/operations/authOperations';
import styles from './LogInPage.module.css';

class LogInPage extends Component {
  componentDidMount() {
    const { isAuthenticated, history } = this.props;

    return (
      isAuthenticated &&
      history.push({
        pathname: '/',
      })
    );
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props;

    if (prevProps.isAuthenticated !== isAuthenticated) {
      const { history } = this.props;
      return (
        isAuthenticated &&
        history.push({
          pathname: '/',
        })
      );
    }

    return null;
  }

  render() {
    const { onLogIn } = this.props;
    return (
      <div className={styles.holder}>
        <h2 className={styles.header}>Log In Page</h2>
        <LogInForm onLogIn={onLogIn} {...this.props} />
      </div>
    );
  }
}
const mstp = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

const mdtp = {
  onLogIn: authOperations.logIn,
};

export default connect(
  mstp,
  mdtp,
)(LogInPage);
