import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from './firebase.js';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../reducers-redux/userReducer.js'; // Import your user reducer action
import { useEffect, useState } from 'react';

export const FireBaseConfig = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  // Define googleSignIn and facebookSignIn functions inside the useEffect
  useEffect(() => {
    const googleSignIn = async () => {
      const googleProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleProvider);
    };

    const facebookSignIn = async () => {
      const facebookProvider = new FacebookAuthProvider();
      return signInWithPopup(auth, facebookProvider);
    };

    const logOut = () => {
      signOut(auth).then(() => {
        dispatch(userLoggedOut()); // Dispatch the userLoggedOut action
      });
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const data = {
        google: googleSignIn,
        facebook: facebookSignIn,
        logOut: logOut,
        currentUser: currentUser,
      };
      setUser(data);
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};
