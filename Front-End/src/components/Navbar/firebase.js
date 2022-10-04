/* eslint-disable no-alert */
/* eslint-disable */
import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from 'firebase/auth';
<<<<<<< HEAD

export const firebaseConfig = {
  apiKey: 'AIzaSyC4_5_rG4jZq1qOxfL4ct_5juWOd15Qp7s',
  authDomain: 'blue-ocean-old-school.firebaseapp.com',
  projectId: 'blue-ocean-old-school',
  storageBucket: 'blue-ocean-old-school.appspot.com',
  messagingSenderId: '708695349594',
  appId: '1:708695349594:web:f7e0c791b481816bb3fb63',
};
=======
import { firebaseConfig } from './firebaseConfig';
>>>>>>> 968b4857dc40e617b5dac6e5449fae1bb365bc64

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
