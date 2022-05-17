import { async } from '@firebase/util';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebaseinit';
import PageTitle from '../../hooks/PageTitle';
import useToken from '../../hooks/useToken';
import SignWithGoogle from '../Register/SignWithGoogle';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Login = () => {
  let location = useLocation();
  let navigate = useNavigate();
const emailref = useRef('')
  const [lguser, lgloading, lgerror] = useAuthState(auth);
  const [errorMessage, setError] = useState("");
  const [
    signInWithEmailAndPassword,
    user,
    regloading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, reseterror] = useSendPasswordResetEmail(
    auth
  );
const [token] = useToken(lguser);
  let from = location.state?.from?.pathname || "/";

  useEffect(()=>{
    if(token){
      navigate(from, { replace: true });
    };
  },[lguser, navigate, token])

  if(lgloading) {
    return <LoadingSpinner/>
  }

  const loginForm = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(email, password);
  }

  const handleResetPass = async (e) => {
    if(!emailref.current.value) {
      toast.warn('Please provide a email!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    return;
    }

    await sendPasswordResetEmail(emailref.current.value);
    if(reseterror) {
      toast.error(reseterror.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      toast.success('Please check your email', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    }
  }
  
  return (
    <div className="login_form signup text-center">
        <PageTitle title="Login" />
        <h3>Sign Up</h3>
        <form onSubmit={loginForm}>
          <input ref={emailref} required placeholder="Email" name="email" type="email" />
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
<p className='mb-5'><button onClick={handleResetPass} className={`reset_button bg-gradient-to-r from-secondary to-primary text-white border-0 btn ${sending ? 'loading' : ''}`}>Reset Password?</button></p>
      </div>
  );
};

export default Login;