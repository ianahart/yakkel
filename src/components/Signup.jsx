import React from 'react';

import '../css/Forms.css';
import SignupForm from './subcomponents/SignupForm';

const Signup = (props) => {
  return (
    <div className="signup">
      <SignupForm {...props} />
    </div>
  );
};

export default Signup;
