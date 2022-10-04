/* eslint-disable no-alert */
/* eslint-disable */
import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from 'firebase/auth';

import { firebaseConfig } from './firebaseConfig';

const app = initializeApp(firebaseConfig);

// eslint-disable-next-line import/prefer-default-export
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const { user } = result;
      console.log('Sign-in successful:', user.displayName);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const { email } = error.customData;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
};

export const signOutGoogle = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.');
    })
    .catch((error) => {
      console.log('Error signing out:', error);
    });
};

export const registerIsLoggedIn = (setIsLoggedIn, setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser({
        username: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
        uid: user.uid,
      });
    } else {
      setIsLoggedIn(false);
      setCurrentUser({});
    }
  });
};
