import React from 'react';

import '../../css/Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="lds-hourglass"></div>
      <p className="loading">Loading...</p>
    </div>
  );
};

export default Spinner;
