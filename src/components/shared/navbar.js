import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Navbar = () => {
  //const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const signoutHandler = () => {
    //ctxDispatch({type: USER_SIGNOUT});
    localStorage.removeItem('userInfo');
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          HydroPonic
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/system" className="navbar-link">
          Systems
        </Link>
        <div className="dropdown">
          <button className="dropdown-button">Data</button>
          <div className="dropdown-content">
            <a href="/plants-data">Plants</a>
            <div className="dropdown-divider"></div>
            <a href="/diseases-data">Diseases</a>
            <div className="dropdown-divider"></div>
            <a href="/systems-data">Systems</a>
          </div>
        </div>
      </div>
      <div className="navbar-user">
        {userInfo ? (
          <div className="dropdown">
            <button className="dropdown-button">
              {userInfo.name}
            </button>
            <div className="dropdown-content">
              <a href="/profile">User Profile</a>
              <a href="/orderhistory">Order History</a>
              <div className="dropdown-divider"></div>
              <a href="/signin" onClick={signoutHandler}>
                Sign Out
              </a>
            </div>
          </div>
        ) : (
          <a className="navbar-button" href="/signin">
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
