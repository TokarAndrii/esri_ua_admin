import React, { Component } from 'react';
import styles from './LogInForm.module.css';

const INITIAL_STATE = { password: '', login: '' };

class LogInForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;

    onSubmit({ ...this.state });

    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { password, login } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              name="login"
              value={login}
              onChange={this.handleChange}
              className={styles.input}
              placeholder="Enter your login"
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              className={styles.input}
              placeholder="Enter your password"
            />
          </label>
          <button className={styles.submitBtn} type="submit">
            Log In
          </button>
        </form>
      </>
    );
  }
}

export default LogInForm;
