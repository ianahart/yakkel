import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../css/App.css';

import Home from './Home';
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import ReadingList from './ReadingList';
import Posts from './Posts';
import Post from './Post';
import Edit from './Edit';
import CreatePost from './CreatePost';
import About from './About';
import Footer from './Footer';
import NotFound from './NotFound';
import ProtectedRoute from './subcomponents/ProtectedRoute';

const Routes = (props) => {
  return (
    <div>
      <div className="main-wrapper">
        <Router>
          <Header {...props} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <ProtectedRoute
              exact
              path="/readinglist"
              auth={props.isAuthenticated}
              component={ReadingList}
            />
            <ProtectedRoute
              exact
              path="/posts"
              auth={props.isAuthenticated}
              component={Posts}
            />
            <ProtectedRoute
              exact
              path="/posts/create"
              auth={props.isAuthenticated}
              component={CreatePost}
            />
            <ProtectedRoute
              exact
              path="/posts/:id"
              auth={props.isAuthenticated}
              component={Post}
            />
            <ProtectedRoute
              exact
              path="/posts/edit/:id"
              auth={props.isAuthenticated}
              component={Edit}
            />
            <Route exact path="/about" component={About} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default Routes;
