import React from 'react';

const Modal = ({ setModalOpen, handleDelete, postID, postTitle }) => {
  return (
    <div className="modal">
      <h2>
        Are you sure you want to delete{' '}
        <span>
          <em>{postTitle}</em>
        </span>
        ?{' '}
      </h2>
      <div className="btns">
        <button onClick={() => setModalOpen(false)}>Cancel</button>
        <button data-postid={postID} onClick={handleDelete}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Modal;
