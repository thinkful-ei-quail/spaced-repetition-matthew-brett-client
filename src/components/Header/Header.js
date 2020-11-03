import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";

import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className='right'>
        <span><p>{this.context.user.name}</p></span>
        <nav>
          <Link onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className='right'>
        <nav>
          <Link to="/login">Login</Link> <Link to="/register">Sign up</Link>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <header>
        <div className="left">
          {null}
        </div>
        <div>
          <h1 className="center">
            <Link to="/">wordistry</Link>
          </h1>
        </div>
        <div>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </header>
    );
  }
}

export default Header;
