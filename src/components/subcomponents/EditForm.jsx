import React, { useReducer, useEffect } from 'react';
import fire from '../../config/Fire';
import NotFound from '../NotFound';

const EditForm = (props) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),

    {
      title: '',
      body: '',
      error: '',
      image: '',
      successmsg: '',
      docID: '',
      postID: '',
      resourceNotFound: false,
      sizeError: '',
    }
  );

  useEffect(() => {
    const _db = fire.firestore();
    const id = props.match.params.id;
    _db
      .collection('posts')
      .where('postID', '==', id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          setUserInput({ resourceNotFound: true });
        } else {
          querySnapshot.forEach((doc) => {
            setUserInput({
              docID: doc.id,
              title: doc.data().title,
              body: doc.data().body,
              image: doc.data().image,
              postID: doc.data().postID,
            });
          });
        }
      });
  }, [props.match.params.id]);

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

  const handleOnChange = (e) => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  const validateFormValues = (title, body) => {
    let errorCount = 0;
    if (!title || !body) {
      setUserInput({ error: 'Please provide values for each field.' });
      errorCount++;
    } else if (title && title.length < 6) {
      setUserInput({ error: 'Title must be a minimum of 6 characters.' });
      errorCount++;
    }
    return errorCount;
  };

  const updateReadingList = () => {
    const _db = fire.firestore();
    const readingListRef = _db.collection('readingList');
    readingListRef
      .where('postID', '==', `${userInput.postID}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          readingListRef.doc(doc.id).update({
            title: userInput.title,
            body: userInput.body,
            image: userInput.image,
          });
        });
      });
  };

  const updatePost = () => {
    const _db = fire.firestore();
    const postRef = _db.collection('posts');
    updateReadingList();
    postRef
      .where('postID', '==', `${userInput.postID}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          postRef.doc(doc.id).update({
            title: userInput.title,
            body: userInput.body,
            image: userInput.image,
            edited: true,
          });
        });
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const errors = validateFormValues(userInput.title, userInput.body);
    if (errors) {
      return;
    } else {
      updatePost();
      setUserInput({
        error: '',
        body: '',
        title: '',
        successmsg: 'Post Was Successfully Edited!',
      });
      setTimeout(() => {
        props.history.push('/posts');
      }, 2000);
    }
  };

  return (
    <React.Fragment>
      {userInput.resourceNotFound ? (
        <NotFound />
      ) : (
        <div className="edit-post">
          <form onSubmit={handleOnSubmit}>
            <h1>Edit Your Post</h1>
            <div className="title-divider"></div>
            <div>
              {userInput.successmsg ? (
                <p className="success-msg">{userInput.successmsg}</p>
              ) : null}
              {userInput.error ? (
                <p className="create-post-form-error">{userInput.error}</p>
              ) : null}
            </div>
            <div className="field-group">
              <label htmlFor="title">Blog Title:</label>
              <input
                value={userInput.title}
                onChange={handleOnChange}
                type="text"
                name="title"
              />
            </div>
            <div className="field-group">
              <label htmlFor="body">Blog Body:</label>
              <textarea
                value={userInput.body}
                type="text"
                onChange={handleOnChange}
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
              <a className="previous-image" href={userInput.image} download>
                Previous Image:
              </a>
            </div>
            <div>
              <button disabled={userInput.sizeError} type="submit">
                Edit Post
              </button>
            </div>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditForm;
