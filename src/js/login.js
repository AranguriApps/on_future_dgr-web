import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from 'firebaseui';
import firebaseConfig from '../js/firebaseConfig'

initializeApp(firebaseConfig);
// Initialize the FirebaseUI Widget using Firebase.

const auth = getAuth();
console.log(auth);
var ui = new firebaseui.auth.AuthUI(auth);

let user = null;
let isSignedIn = false;
ui.start('#firebaseui-auth-container', {
  signInSuccessUrl: 'admin-clients.html',
  signInOptions: [
    // List of OAuth providers supported.
    GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {

    signInSuccessWithAuthResult: function (authResult) {
      user = authResult.user.displayName;
      console.log(authResult);
      isSignedIn = true;
      console.log(user);
      return true;

    },
    signInFailure: function (authError) {
      window.location.href = '404.html';
    }
  }
  // Other config options...
  /* customParameters: {
       // Forces account selection even when one account
       // is available.
       prompt: 'select_account'
     }*/
});

