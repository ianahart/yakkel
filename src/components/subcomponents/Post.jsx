import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import Modal from '../subcomponents/Modal';
import BookmarkButton from './BookmarkButton';

const Post = ({ post, onDeletePost, auth }) => {
  const [author, setAuthor] = useState('');
  const [bookmark, setBookMark] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [ModalOpen, setModalOpen] = useState(false);
  const currentUser = fire.auth().currentUser;
  const _db = fire.firestore();

  useEffect(() => {
    if (currentUser !== null) {
      const unsubscribe = fire
        .firestore()
        .collection('readingList')
        .where('postID', '==', `${post.postID}`)
        .where('userID', '==', `${currentUser.uid}`)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setBookMark(doc.data().bookmark);
          });
        });
      return () => unsubscribe();
    }
  }, [post.postID, currentUser]);

  useEffect(() => {
    const unsubscribe = fire
      .firestore()
      .collection('users')
      .where('userID', '==', `${post.userID}`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setAuthor(doc.data().name);
        });
      });
    return () => unsubscribe();
  }, [post.userID]);

  useEffect(() => {
    let timerID;
    const clearToast = () => {
      if (toast) {
        timerID = setTimeout(() => {
          setToastText('');
        }, 1000);
      }
    };
    clearToast();
    return () => {
      clearTimeout(timerID);
    };
  }, [toast]);

  const handleDelete = (e) => {
    const postIdToDelete = e.target.getAttribute('data-postid');
    const postsRef = _db.collection('posts');
    postsRef
      .where('postID', '==', `${postIdToDelete}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
          onDeletePost(doc.data().postID);
        });
        _db
          .collection('readingList')
          .where('postID', '==', `${postIdToDelete}`)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });
      });
  };

  const addToReadingList = (e) => {
    const postIdToBookmark = e.target.getAttribute('data-postid');

    setBookMark(true);
    setToastText('Post added to Reading List!');
    setToast(true);

    const postsRef = _db.collection('posts');
    postsRef
      .where('postID', '==', `${postIdToBookmark}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          addBookmarkedPostToDB(doc.data());
        });
      });
  };

  const addBookmarkedPostToDB = (post) => {
    const readingListRef = _db.collection('readingList');
    readingListRef
      .where('postID', '==', `${post.postID}`)
      .where('userID', '==', `${auth}`)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          _db.collection('readingList').add({
            title: post.title,
            image: post.image,
            userID: auth,
            postID: post.postID,
            bookmark: true,
          });
        }
      });
  };

  const showButtons =
    currentUser.uid === post.userID ? (
      <React.Fragment>
        <Link to={`posts/edit/${post.postID}`}>
          <i className="far fa-edit edit-btn"></i>
        </Link>
        <i
          onClick={() => setModalOpen(true)}
          className="fas fa-trash-alt delete-btn"
        ></i>
      </React.Fragment>
    ) : (
      <BookmarkButton
        addToReadingList={addToReadingList}
        postID={post.postID}
        bookmark={bookmark}
        setBookmark={setBookMark}
        handleDelete={handleDelete}
        setToast={setToast}
      />
    );

  const generateSnippet = (body) => {
    let maxLength = 110;
    if (body.length <= maxLength) {
      return body;
    }

    const words = body.split(' ');
    let snippet = '';
    let testStr;
    words.forEach((word) => {
      testStr = snippet + ' ' + word;

      if (testStr.length > maxLength) {
        return false;
      } else {
        snippet = testStr;
      }
    });
    snippet = snippet.replace(/[\s|.]+$/i, '');

    return snippet + '...';
  };

  const snippet = generateSnippet(post.body);

  return (
    <div className="post">
      <div className="meta-content">
        {showButtons}
        {ModalOpen ? (
          <Modal
            postTitle={post.title}
            postID={post.postID}
            handleDelete={handleDelete}
            setModalOpen={setModalOpen}
          />
        ) : null}
        <div className="column">
          <h6>
            Written By: <span>{author}</span>
          </h6>
          <h6 className="date">{post.createdAt}</h6>
          {post.edited && post.userID !== currentUser.uid ? (
            <h6 className="edited">(Edited)</h6>
          ) : null}
        </div>

        {toast ? (
          <div className="toast">
            <p>{toastText}</p>
          </div>
        ) : null}
      </div>

      <Link to={`posts/${post.postID}`}>
        <h3>
          <strong>{post.title}</strong>
        </h3>
      </Link>
      <img src={post.image} alt={post.title} />
      <p>{snippet}</p>
    </div>
  );
};

export default Post;
