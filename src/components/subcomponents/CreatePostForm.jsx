import React, { useReducer, useEffect, useRef } from 'react';
import uuid from 'uuid';

import fire from '../../config/Fire';

const CreatePostForm = () => {
  const formRef = useRef();
  const currentUser = fire.auth().currentUser;
  const _db = fire.firestore();

  const getDate = () => {
    const now = new Date();
    return now.toLocaleDateString();
    // return now.toLocaleTimeString();
  };

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),

    {
      title: '',
      body: '',
      error: '',
      image: '',
      userID: '',
      postID: uuid.v4(),
      createdAt: getDate(),
      successmsg: '',
      sizeError: '',
    }
  );

  useEffect(() => {
    if (currentUser) {
      setUserInput({ userID: currentUser.uid });
    }
  }, [currentUser]);

  useEffect(() => {
    const FadeawaySuccessMsg = (e) => {
      if (e.target.tagName === 'INPUT') {
        if (userInput.successmsg) {
          setUserInput({ successmsg: '' });
        }
      }
    };
    document.body.addEventListener('click', FadeawaySuccessMsg);

    return () => {
      document.body.removeEventListener('click', FadeawaySuccessMsg);
    };
  });

  useEffect(() => {
    if (!userInput.postID) {
      setUserInput({ postID: uuid.v4() });
    }

    if (!userInput.createdAt) {
      setUserInput({ createdAt: getDate() });
    }
  }, [userInput.postID, userInput.createdAt]);

  const handleOnChange = (e) => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = (r) => {
      if (r.total > 1048487) {
        setUserInput({
          sizeError: 'Image is too Large. Please Use a smaller one.',
        });
      } else {
        setUserInput({ image: r.target.result });
        setUserInput({
          sizeError: '',
        });
      }
    };
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  const validateFormValues = () => {
    const { title, body } = userInput;
    let errorCount = 0;
    if (!title || !body) {
      setUserInput({ error: 'Please provide values for both form fields.' });
      errorCount++;
    } else if (title.length < 6) {
      setUserInput({ error: 'Blog Title must be a minimum of 6 characters.' });
      errorCount++;
    } else {
      setUserInput({ error: '' });
    }
    return errorCount;
  };

  const addPost = () => {
    _db.collection('posts').add({
      title: userInput.title,
      body: userInput.body,
      image: userInput.image,
      postID: userInput.postID,
      createdAt: userInput.createdAt,
      userID: userInput.userID,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const errorCount = validateFormValues();

    if (errorCount > 0) {
      return;
    } else {
      addPost();
      setUserInput({
        title: '',
        body: '',
        error: '',
        image: '',
        postID: '',
        createdAt: '',
        successmsg: 'Blog post was successfully created!',
      });
      formRef.current.reset();
    }
  };

  return (
    <div className="create-post">
      <form ref={formRef} onSubmit={onFormSubmit}>
        <h1>Create Your Post</h1>
        <div className="title-divider"></div>
        <p className="success-msg">
          {userInput.successmsg ? userInput.successmsg : null}
        </p>
        <p className="create-post-form-error">
          {userInput.error ? userInput.error : null}
        </p>
        <div className="field-group">
          <label htmlFor="title">Blog Title:</label>
          <input
            onChange={handleOnChange}
            value={userInput.title}
            type="text"
            name="title"
          />
        </div>
        <div className="field-group">
          <label htmlFor="body">Blog Body:</label>
          <textarea
            onChange={handleOnChange}
            value={userInput.body}
            type="text"
            name="body"
          ></textarea>
        </div>
        <div className="field-group">
          <label htmlFor="image">Upload Blog Image:</label>
          <p className="size-error">
            {userInput.sizeError ? userInput.sizeError : null}
          </p>
          <input
            id="image-upload"
            type="file"
            name="image"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <button disabled={userInput.sizeError} type="submit">
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
