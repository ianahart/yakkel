import React, { useState, useEffect } from 'react';

import Post from './subcomponents/Post';
import Spinner from './subcomponents/Spinner';
import fire from '../config/Fire';
import '../css/Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = fire.auth().currentUser;

  useEffect(() => {
    const _db = fire.firestore();
    const fetchPosts = async () => {
      try {
        const snapshot = await _db.collection('posts').get();
        snapshot.forEach((doc) => {
          setPosts((posts) => [...posts, doc.data()]);
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const onDeletePost = (id) => {
    const filteredPosts = posts.filter((post) => {
      return post.postID !== id;
    });
    setPosts(filteredPosts);
  };
  const renderPosts = () => {
    return posts.map((postData) => {
      return (
        <Post
          auth={currentUser.uid}
          key={postData.postID}
          post={postData}
          onDeletePost={onDeletePost}
        />
      );
    });
  };
  return (
    <div>
      {!posts.length ? (
        <Spinner />
      ) : (
        <div className="posts">{renderPosts()}</div>
      )}
    </div>
  );
};

export default Posts;
