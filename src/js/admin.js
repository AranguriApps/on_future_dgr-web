import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../js/firebaseConfig'

initializeApp(firebaseConfig);

getAuth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("User logueado")
    console.log(user)
  } else {
    console.log("No hay user")
  }
});