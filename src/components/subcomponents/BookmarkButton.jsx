import React from 'react';
import fire from '../../config/Fire';

const BookmarkButton = ({
  postID,
  addToReadingList,
  bookmark,
  setBookmark,
  setToast,
}) => {
  const currentUser = fire.auth().currentUser;

  const deleteBookmark = (e) => {
    if (currentUser !== null) {
      const id = e.target.getAttribute('data-postid');
      const _db = fire.firestore();
      const readingListRef = _db.collection('readingList');
      readingListRef
        .where('postID', '==', `${id}`)
        .where('userID', '==', `${currentUser.uid}`)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            readingListRef.doc(doc.id).delete();
          });
        })
        .then(() => {
          setBookmark(false);
          setToast(false);
        });
    }
  };

  return (
    <React.Fragment>
      {!bookmark ? (
        <i
          onClick={addToReadingList}
          data-postid={postID}
          className="not-active-bookmark far fa-bookmark"
        ></i>
      ) : (
        <i
          data-postid={postID}
          onClick={deleteBookmark}
          className="fas fa-bookmark active-bookmark-btn"
        ></i>
      )}
    </React.Fragment>
  );
};

export default BookmarkButton;
