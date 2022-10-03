// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
// import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
// import firebaseConfig from './firebase-config';

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider(app);

// signInWithPopup (auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });














// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     {
//       provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       scopes: [
//         'https://www.googleapis.com/auth/contacts.readonly'
//       ],
//       customParameters: {
//         // Forces account selection even when one account
//         // is available.
//         prompt: 'select_account'
//       }
//     },
//     {
//       provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       scopes: [
//         'public_profile',
//         'email',
//         'user_likes',
//         'user_friends'
//       ],
//       customParameters: {
//         // Forces password re-entry.
//         auth_type: 'reauthenticate'
//       }
//     }
//   ]
// });