import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import fire from '../../config/Fire';
import '../../css/AccountDetails.css';

const AccountDetails = (props) => {
  const [userName, setUserName] = useState('');
  const userEmail = fire.auth().currentUser.email;
  const history = useHistory();

  useEffect(() => {
    if (userEmail !== null) {
      const unsubscribe = fire
        .firestore()
        .collection('users')
        .where('email', '==', `${userEmail}`)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUserName(doc.data().name);
          });
        });
      return () => {
        unsubscribe();
      };
    }
  }, [userEmail]);

  const signOutUser = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        history.push('/');
      })
      .then(() => props.setIsDropdownOpen(false));
  };

  return (
    <div className="account-details">
      <div className="styled-border">
        Details:
        <div>
          <i
            onClick={() => props.setIsAccountDetailsOpen(false)}
            className="fas fa-times"
          ></i>
        </div>
      </div>
      <p>
        Email: <span>{userEmail}</span>
      </p>
      <p>
        Name: <span>{userName}</span>
      </p>
      <div className="main-account-content">
        <button onClick={signOutUser}>
          <i className="fas fa-sign-out-alt logout-icon"></i>Logout
        </button>
        <button>
          <Link to="/readinglist">
            <i className="fas fa-book-open reading-list-icon"></i>Reading List
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
