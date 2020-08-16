import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import fire from '../config/Fire';
import Spinner from './subcomponents/Spinner';
import '../css/ReadingList.css';

const ReadingList = () => {
  const [posts, setPosts] = useState([]);
  const [isPageEmpty, setIsPageEmpty] = useState(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(null);

  const currentUser = fire.auth().currentUser;

  useEffect(() => {
    if (!posts.length) {
      setIsPageEmpty(true);
    } else {
      setIsPageEmpty(false);
    }
    return () => {
      setIsPageEmpty(null);
    };
  }, [isPageEmpty, posts]);

  useEffect(() => {
    if (currentUser !== null) {
      const _db = fire.firestore();
      const usersRef = _db
        .collection('users')
        .where('userID', '==', `${currentUser.uid}`);
      usersRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setName(doc.data().name);
        });
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser !== null) {
      setIsLoading(true);

      const fetchPosts = async () => {
        try {
          const _db = fire.firestore();
          const snapshot = await _db
            .collection('readingList')
            .where('userID', '==', `${currentUser.uid}`)
            .get();
          snapshot.forEach((doc) => {
            setPosts((posts) => [...posts, doc.data()]);
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchPosts().then(() => setIsLoading(false));
    }
  }, [currentUser]);

  const handleDelete = (e) => {
    const _db = fire.firestore();
    const ID = e.target.getAttribute('data-id');
    const postsRef = _db.collection('readingList');
    postsRef
      .where('postID', '==', `${ID}`)
      .where('userID', '==', `${currentUser.uid}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          removePost(doc.data().postID);
          _db.collection('readingList').doc(doc.id).delete();
        });
      });
  };

  const removePost = (id) => {
    const filteredPosts = posts.filter((post) => {
      return post.postID !== id;
    });
    setPosts(filteredPosts);
  };

  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <div className="list-item" key={post.postID}>
          <div className="btn-wrapper">
            <i
              data-id={post.postID}
              onClick={handleDelete}
              className="fas fa-times"
            ></i>
          </div>
          <Link to={`posts/${post.postID}`}>
            <h1>{post.title}</h1>
          </Link>
          <img src={post.image} alt={post.title} />
        </div>
      );
    });
  };

  const title = isPageEmpty ? (
    <h1 className="reading-list-main-heading">
      Add Blog Posts to Your Reading List...
    </h1>
  ) : (
    <h1 className="reading-list-main-heading">
      Here is your Reading List, {name.split(' ')[0]}...
      <i className="fas fa-glasses glasses-icon"></i>
    </h1>
  );
  return (
    <div className="reading-list">
      {title}
      {isLoading ? <Spinner /> : null}
      <div className={`${!isPageEmpty ? 'list-wrapper' : ''}`}>
        {renderPosts()}
      </div>
    </div>
  );
};

export default ReadingList;
