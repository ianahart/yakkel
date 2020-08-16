import React, { useState, useEffect } from 'react';
import Routes from './components/Routes';
import fire from './config/Fire';

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user.uid);
        setIsAuthenticated(true);
      } else {
        setAuthUser(false);
        setIsAuthenticated(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [authUser]);
  return (
    <div>
      <Routes authUser={authUser} isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default App;
