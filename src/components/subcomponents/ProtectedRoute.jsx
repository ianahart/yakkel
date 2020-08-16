import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          if (rest.auth) {
            return <Component {...props} />;
          } else if (rest.auth === false) {
            return <Redirect to="/login" />;
          } else {
            return null;
          }
        }}
      />
    );
  }
}

export default ProtectedRoute;
