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
import { getFirestore,collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebaseConfig from '../js/firebaseConfig'

initializeApp(firebaseConfig);
async function main(){
console.log("inside main")
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

}

main()
console.log("after main")
