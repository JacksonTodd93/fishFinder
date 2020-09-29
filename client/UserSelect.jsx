import React from 'react';
import styled from 'styled-components';

class UserSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formEntry: ''
    }
  }

  handleSelect(event) {
    this.props.fetchUser(event.target.value);
  }

  handleInput(event) {
    this.setState({
      formEntry: event.target.value
    });
  }

  createNewUser() {
    this.props.createNewUser(this.state.formEntry);
    this.setState({
      formEntry: ''
    })
  }

  render() {
    return (
      <div>
        <label for="users">Select your username:</label>
        <select name="users" onChange={this.handleSelect.bind(this)}>
          {this.props.allUsers.map((user, i) => {
            return (
              <option key={i}>{user.name}</option>
            )
          })}
        </select>
        <div>
          <label for="input">Register a New User:</label>
          <input name="input" type="text" value={this.state.formEntry} onChange={this.handleInput.bind(this)}></input>
          <button onClick={this.createNewUser.bind(this)}>Register</button>
        </div>
      </div>
    )
  }
}

export default UserSelect;