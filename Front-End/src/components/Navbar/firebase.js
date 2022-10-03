/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
      console.log(credential, token, user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const { email } = error.customData;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
};
