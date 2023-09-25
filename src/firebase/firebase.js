// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC7njN_Y9NNLrk2QTV2o5RHFPpiCUa_1Lo',
  authDomain: 'grow-ponic-authentication.firebaseapp.com',
  projectId: 'grow-ponic-authentication',
  storageBucket: 'grow-ponic-authentication.appspot.com',
  messagingSenderId: '386453747081',
  appId: '1:386453747081:web:723b6441400b47cea15d58',
  measurementId: 'G-SG2F2B5GJZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//const analytics = getAnalytics(app);
