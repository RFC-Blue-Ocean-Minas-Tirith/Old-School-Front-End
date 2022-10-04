/* eslint-disable no-alert */
/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC4_5_rG4jZq1qOxfL4ct_5juWOd15Qp7s',
  authDomain: 'blue-ocean-old-school.firebaseapp.com',
  projectId: 'blue-ocean-old-school',
  storageBucket: 'blue-ocean-old-school.appspot.com',
  messagingSenderId: '708695349594',
  appId: '1:708695349594:web:f7e0c791b481816bb3fb63',
};

const app = initializeApp(firebaseConfig);

// eslint-disable-next-line import/prefer-default-export
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const { user } = result;
      console.log('credential:', credential, 'token:', token, 'user:', user);
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
  signOut(auth).then(() => {
    alert('Sign-out successful.');
  }).catch((error) => {
    alert('Error signing out:', error);
  });
};

export const getCurrentUser = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      console.log('user:', user);
      return true;
    } else {
      console.log('No user signed in');
      return false;
    }
  });
};
