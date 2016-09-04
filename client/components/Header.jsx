import React, { Component } from 'react';
import Accounts from './Accounts';
import { Link, browserHistory } from 'react-router';

class Header extends Component {
   isUserLoggedIn() {
    return Meteor.userId !== null;
  }
  render() {
    return (
      <nav className="nav navbar-default">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">Beanterest</Link>
        </div>
        <ul className="nav navbar-nav">
          <li><Accounts /></li>
          {
            this.isUserLoggedIn()
            ? <Link to="/mybeans">My beans</Link>
            : ''
          }
        </ul>
      </nav>
    );
  }
}

export default Header;
