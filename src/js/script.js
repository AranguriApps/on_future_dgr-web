function setNavClickListener(idBtn) {
    document.getElementById(idBtn).addEventListener('click', () => {
        const myCollapse = document.getElementById('navbarCollapsable')
        const bsCollapse = new bootstrap.Collapse(myCollapse)
        bsCollapse.hide()
    })
}

setNavClickListener('btnHome')
setNavClickListener('btnServices')
setNavClickListener('btnWe')
setNavClickListener('btnClients')
setNavClickListener('btnContact')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPb68MpR4j6C1dL2j2PJMen53lgo5TuFM",
  authDomain: "onfuture-b558a.firebaseapp.com",
  projectId: "onfuture-b558a",
  storageBucket: "onfuture-b558a.appspot.com",
  messagingSenderId: "854874312901",
  appId: "1:854874312901:web:c33e59539dd4123a93e0ac",
  measurementId: "G-RHSM0YB0PZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app.name)
