import React, { useReducer } from 'react';
import fire from '../../config/Fire';

const SignupForm = (props) => {
  const _db = fire.firestore();

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      email: '',
      password: '',
      password2: '',
      error: '',
    }
  );
  const handleOnChange = (e) => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  const validateFormValues = () => {
    let errorCount = 0;
    const { name, email, password, password2 } = userInput;
    if (!name || !email || !password || !password2) {
      errorCount++;
      setUserInput({ error: 'Please provide a value for each field.' });
    } else if (password.length < 6) {
      errorCount++;
      setUserInput({
        error: 'Password must be a minimum of 6 characters. ',
      });
    } else if (password !== password2) {
      errorCount++;
      setUserInput({ error: 'Passwords do not match.' });
    } else {
      setUserInput({ error: '' });
    }

    return errorCount;
  };

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    const errorCount = validateFormValues();
    setUserInput({
      name: '',
      email: '',
      password: '',
      password2: '',
    });
    if (errorCount > 0) {
      return;
    } else {
      SignInWithFB();
    }
  };
  const SignInWithFB = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then((cred) => {
        _db
          .collection('users')
          .add({
            name: userInput.name,
            email: userInput.email,
            userID: cred.user.uid,
          })
          .then(() => props.history.push('/'));
      })
      .catch((error) => {
        setUserInput({ error: error.message });
      });
  };

  return (
    <form onSubmit={handleOnFormSubmit}>
      <h1>Create an Account</h1>
      <div className="title-divider"></div>
      <p className="signup-form-error">
        {userInput.error ? userInput.error : null}
      </p>
      <div className="field-group">
        <label htmlFor="name">Name:</label>
        <input
          onChange={handleOnChange}
          value={userInput.name}
          type="text"
          name="name"
        />
      </div>
      <div className="field-group">
        <label htmlFor="email">Email:</label>
        <input
          onChange={handleOnChange}
          value={userInput.email}
          type="email"
          name="email"
        />
      </div>
      <div className="field-group">
        <label htmlFor="password">Password:</label>
        <input
          onChange={handleOnChange}
          value={userInput.password}
          type="password"
          name="password"
        />
      </div>
      <div className="field-group">
        <label htmlFor="password2">Confirm Password:</label>
        <input
          onChange={handleOnChange}
          value={userInput.password2}
          type="password"
          name="password2"
        />
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default SignupForm;
