import React, { useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebaseinit';
import PageTitle from '../../hooks/PageTitle';
import SignWithGoogle from '../Register/SignWithGoogle';

const Login = () => {
  const goHome = useNavigate('')
  const [lguser, lgloading, lgerror] = useAuthState(auth);
  const [errorMessage, setError] = useState("");
  const [
    signInWithEmailAndPassword,
    user,
    regloading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  if(lguser) {
    goHome('/')
  }


  const loginForm = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(email, password);
  }
  
  return (
    <div className="login_form signup text-center">
        <PageTitle title="Login" />
        <h3>Sign Up</h3>
        <form onSubmit={loginForm}>
          <input required placeholder="Email" name="email" type="email" />
          <br />
          <input required placeholder="Password" name="password" type="password" />
          {errorMessage}
          <button className={`login_btn ${regloading ? 'btn loading' : ''}`}>Sign Up</button>
          <br />
          <span>
          Don't have an account? <Link to="/register">Register</Link>
          </span>
          <p>or</p>
        </form>
<SignWithGoogle/>
      </div>
  );
};

export default Login;