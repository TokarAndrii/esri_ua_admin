import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogInForm from '../../components/loginForm/LogInForm';
import styles from './LogInPage.module.css';

class LogInPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className={styles.holder}>
        <h2 className={styles.header}>Log In Page</h2>
        <LogInForm />
      </div>
    );
  }
}
const mstp = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mstp)(LogInPage);
