import React from 'react';
import EditForm from './subcomponents/EditForm';

import '../css/Forms.css';

const Edit = (props) => {
  return (
    <div className="edit">
      <EditForm {...props} />
    </div>
  );
};

export default Edit;
