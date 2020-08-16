import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import AccountDetails from './subcomponents/AccountDetails';
import '../css/Header.css';

const Header = (props) => {
  const navbarRef = useRef();
  const [hamburgerIcon, setHamburgerIcon] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);

  const caretIcon = !isAccountDetailsOpen ? (
    <i className="fas fa-caret-up"></i>
  ) : (
    <i className="fas fa-caret-down"></i>
  );

  const toggleHamburger = () => {
    if (navbarRef.current.clientWidth < 602) {
      setHamburgerIcon(true);
    } else {
      setHamburgerIcon(false);
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    const closeMenu = (e) => {
      if (navbarRef.current.contains(e.target)) {
        return;
      } else {
        setIsDropdownOpen(false);
      }
    };
    // for initialization
    toggleHamburger();

    document.body.addEventListener('click', closeMenu);
    return () => {
      document.body.removeEventListener('click', closeMenu);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', toggleHamburger);

    return () => {
      window.addEventListener('resize', toggleHamburger);
    };
  });

  useEffect(() => {
    window.addEventListener('click', hideAccountDetails);

    return () => {
      window.removeEventListener('click', hideAccountDetails);
    };
  }, [isAccountDetailsOpen]);

  const hideAccountDetails = (e) => {
    if (!e.target.classList.contains('account-details-btn')) {
      setIsAccountDetailsOpen(false);
    }
  };

  const handleShowMenu = () => {
    isDropdownOpen ? setIsDropdownOpen(false) : setIsDropdownOpen(true);
  };

  const navigation = () => {
    const toggleAuthStatus = props.authUser ? null : (
      <li>
        <NavLink onClick={(e) => setIsDropdownOpen(false)} to="/login">
          Login
        </NavLink>
      </li>
    );

    return (
      <ul>
        <li className="brand-name">
          <NavLink to="/">
            <i className="far fa-comment-alt"></i> YaKKel
          </NavLink>
        </li>
        <li>
          <NavLink onClick={(e) => setIsDropdownOpen(false)} to="/">
            Home
          </NavLink>
        </li>
        {/* Login/Logout */}
        {toggleAuthStatus}
        {props.authUser ? (
          <React.Fragment>
            <li>
              <button
                onClick={() => setIsAccountDetailsOpen(!isAccountDetailsOpen)}
                className="account-details-btn"
              >
                {caretIcon} Your Account
              </button>
            </li>
            <li>
              <NavLink onClick={(e) => setIsDropdownOpen(false)} to="/posts">
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={(e) => setIsDropdownOpen(false)}
                to="/posts/create"
              >
                Create Post
              </NavLink>
            </li>
          </React.Fragment>
        ) : null}

        <li>
          <NavLink onClick={(e) => setIsDropdownOpen(false)} to="/about">
            About
          </NavLink>
        </li>
      </ul>
    );
  };
  const toggleNavigationMenu = isDropdownOpen ? navigation() : null;
  return (
    <div className="header">
      <nav ref={navbarRef} className="navbar">
        {hamburgerIcon ? (
          <i className="fas fa-bars hamburger" onClick={handleShowMenu}></i>
        ) : (
          navigation()
        )}
        {toggleNavigationMenu}
      </nav>
      {isAccountDetailsOpen ? (
        <AccountDetails
          setIsAccountDetailsOpen={setIsAccountDetailsOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          history={props.history}
        />
      ) : null}
    </div>
  );
};

export default Header;
