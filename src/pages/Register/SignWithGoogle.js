import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import googleIcon from '../../assets/images/google.svg'
import auth from '../../firebaseinit';

const SignWithGoogle = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <div>
      <button onClick={()=>signInWithGoogle()} className={`google_signin mb-5 mt-5 ${loading ? 'btn loading' : ''}`}>
          <img width={20} src={googleIcon} alt="" /> &nbsp; Continue with Google
        </button>
    </div>
  );
};

export default SignWithGoogle;