import React, {Component} from "react";

import "./index.css";

class LoginForm extends Component {
  constructor() {
    super();

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  state = {
    username: "",
    password: ""
  };

  submit(e) {
    e.preventDefault();
    const {username, password} = this.state;

    this.props.login(username, password);
  }

  render() {
    return (
      <form className="loginPage__form" onSubmit={this.submit}>
        <div className="loginPage__inputGroup">
          <label htmlFor="username">Nazwa użytkownika</label>
          <input
            className="loginPage__textInput"
            type="text"
            id="username"
            onChange={this.onChangeUsername}
          />
        </div>

        <div className="loginPage__inputGroup">
          <label htmlFor="password">Hasło</label>
          <input
            className="loginPage__textInput"
            type="password"
            id="password"
            onChange={this.onChangePassword}
          />
        </div>

        <input
          className="loginPage__submit"
          type="submit"
          value="Zaloguj się"
        />
      </form>
    );
  }
}
export default LoginForm;
