import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import './header.css';

export default class Header extends Component {
  onLogoutClick = (event) => {
    event.preventDefault();
    this.props.handleLogout();
  }

  render() {
    const { user } = this.props;
    const pathname = this.props.location.pathname;
    const isLoginPage = pathname.indexOf('login') > -1;
    const isAboutPage = pathname.indexOf('about') > -1;

    const isNotificationsPage = pathname.indexOf('notifications') > -1;

    return (
      !isLoginPage &&
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
          <button type="button" className="navbar-toggler navbar-toggler-right" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <IndexLink to="/" className="navbar-brand">
              <div title="Home" className="brand"/>
              Home
          </IndexLink>
          <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {/* <li title="Github Users with over 1000 Followers" className={isUsersPage ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/users">Most Followed Users</Link></li> */}
              {/* <li title="Github Repos with over 10000 Stars" className={isReposPage ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/repos">Most Starred Repos</Link></li> */}
              <li title="Notifications" className={isNotificationsPage ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/notifications">Notifications</Link></li>
              <li title="Grownodes" className={'nav-item'}><Link className="nav-link" to="/grownodes">Grownodes</Link></li>
              <li title="About" className={isAboutPage ? 'nav-item active' : 'nav-item'}><Link className="nav-link" to="/about">About</Link></li>
            </ul>

          </div>
        </nav>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
  location: React.PropTypes.object,
};
