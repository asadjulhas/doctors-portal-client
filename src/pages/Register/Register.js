import React, { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebaseinit";
import PageTitle from "../../hooks/PageTitle";
import "./Register.css";
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { async } from "@firebase/util";

const Register = () => {
  const [errorMessage, setError] = useState("");
  const [user, loading, error] = useAuthState(auth);

  console.log(user)
  const [
    createUserWithEmailAndPassword,
    reguser,
    regloading,
    regerror,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, uperror] = useUpdateProfile(auth);

  const signUpForm = async (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const conpassword = e.target.conpassword.value;

    if(!displayName) {
      setError(<p className="text-[red]">Please put your name</p>);
      return;
    } else {
      setError('');
    }

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError(<p className="text-[red]">You have entered an invalid email address!</p>);
      return;
    } else {
      setError('');
    }

    if(password.length <= 5) {
      setError(<p className="text-[red]">Password must contain minimum six characters</p>);
      return;
    } else {
      setError('');
    }

    if(password !== conpassword) {
      setError(<p className="text-[red]">Password not match</p>);
      return;
    } else {
      setError('');
    }
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({displayName})
  };
  return (
    <div>
      <div className="login_form signup text-center">
        <PageTitle title="Register" />
        <h3>Sign Up</h3>
        <form onSubmit={signUpForm}>
          <input placeholder="Type your name" name="name" type="text" />
          <br />
          <input placeholder="Email" name="email" type="email" />
          <br />
          <input placeholder="Password" name="password" type="password" />
          <br />
          <input
            placeholder="Confirm Password"
            name="conpassword"
            type="password"
          />
          <br />
          {error}
          <button className="login_btn">Sign Up</button>
          <br />
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
          <p>or</p>
        </form>

        <button className="google_signin mb-8 mt-5">
          <img width={20} src="" alt="" /> &nbsp; Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;