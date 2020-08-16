import React, { useState, useEffect } from 'react';
import fire from '../config/Fire';
import Spinner from './subcomponents/Spinner';
import NotFound from './NotFound';
import '../css/Post.css';

const Post = (props) => {
  const [post, setPost] = useState('');
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const _db = fire.firestore();
    const id = props.match.params.id;
    _db
      .collection('posts')
      .where('postID', '==', id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          setNotFound(true);
        } else {
          querySnapshot.forEach((doc) => {
            setPost(doc.data());
          });
        }
      });
  }, [props.match.params.id]);

  const renderPost = () => {
    return (
      <React.Fragment>
        {!post ? (
          <Spinner />
        ) : (
          <div className="single-post">
            <div className="post-wrapper">
              <div className="post-content">
                <header>
                  <h1>{post.title}</h1>
                </header>
                <div>
                  <img src={post.image} alt={post.title} />
                </div>
                <div>
                  <p>{post.body}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>{notFound ? <NotFound /> : renderPost()}</React.Fragment>
  );
};

export default Post;
