import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
const LoginForm = (props) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
      error: '',
    }
  );
  const handleOnChange = (e) => {
    setUserInput({ [e.target.name]: e.target.value });
  };

  const validateFormValues = () => {
    const { email, password } = userInput;
    if (!email || !password) {
      setUserInput({ error: 'Please provide a value for each field.' });
    } else {
      setUserInput({ error: '' });
    }
  };
  const onHandleFormSubmit = (e) => {
    e.preventDefault();
    validateFormValues();
    setUserInput({
      email: '',
      password: '',
    });
    loginWithFB();
  };

  const loginWithFB = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(userInput.email, userInput.password)
      .then(() => {
        props.history.push('/');
      })
      .catch((error) => {
        setUserInput({ error: error.message });
      });
  };

  return (
    <div className="login">
      <form onSubmit={onHandleFormSubmit}>
        <h1>Login</h1>
        <div className="title-divider"></div>
        <p className="login-form-error">
          {userInput.error ? userInput.error : null}
        </p>
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
        <div className="register">
          <p>
            Not registered? <Link to="/signup">Create an Account</Link>
          </p>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
