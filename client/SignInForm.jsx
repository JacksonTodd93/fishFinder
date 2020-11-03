import React from 'react';
import styled from 'styled-components';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signupOrLogin: 'login',
      usernameEntry: '',
      passwordEntry: '',
    }
  }

  handleUsername(user) {
    this.setState({
      usernameEntry: user.target.value
    });
  }

  handlePassword(pw) {
    this.setState({
      passwordEntry: pw.target.value
    });
  }

  switchForm() {
    if (this.state.signupOrLogin === 'login') {
      this.setState({
        signupOrLogin: 'signup'
      });
    } else {
      this.setState({
        signupOrLogin: 'login'
      });
    }
  }

  signIn() {
    this.props.signIn(this.state.usernameEntry, this.state.passwordEntry);
    this.setState({
      usernameEntry: '',
      passwordEntry: '',
    })
  }

  createNewUser() {
    this.props.createNewUser(this.state.usernameEntry, this.state.passwordEntry);
    this.setState({
      usernameEntry: '',
      passwordEntry: '',
    })
  }

  render() {
    if (this.state.signupOrLogin === 'login') {
      return (
        <div>
          <label for="username">Username:</label>
          <input name="username" type="text" value={this.state.usernameEntry} onChange={this.handleUsername.bind(this)}></input>
          <label for="password">Password:</label>
          <input name="password" type="text" value={this.state.passwordEntry} onChange={this.handlePassword.bind(this)}></input>
          <button onClick={this.signIn.bind(this)}>Sign In</button>
          <div>
            Don't have a login?
          <button onClick={this.switchForm.bind(this)}>Create an Account</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <label for="username">Username:</label>
          <input name="username" type="text" value={this.state.usernameEntry} onChange={this.handleUsername.bind(this)}></input>
          <label for="password">Password:</label>
          <input name="password" type="text" value={this.state.passwordEntry} onChange={this.handlePassword.bind(this)}></input>
          <button onClick={this.createNewUser.bind(this)}>Register</button>
          <div>
            Already have an account?
          <button onClick={this.switchForm.bind(this)}>Login</button>
          </div>
        </div>
      )
    }
  }
}

export default SignInForm;