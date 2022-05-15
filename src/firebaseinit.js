// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs8FkGVDrzrjHIOBdVsegkcR7vhWWiLOM",
  authDomain: "doctor-portal-3890e.firebaseapp.com",
  projectId: "doctor-portal-3890e",
  storageBucket: "doctor-portal-3890e.appspot.com",
  messagingSenderId: "854023921298",
  appId: "1:854023921298:web:56c878f17c55157432104b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
