import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import firebaseConfig from './firebaseConfig'

initializeApp(firebaseConfig);
const db = getFirestore();
const clientsRef = collection(db, "clients");
const tabla = document.getElementById('tabla');
const name = document.getElementById('name');
const logoUrl = document.getElementById('logo_url');
const description = document.getElementById('description');
const targetUrl = document.getElementById('target_url');
const boton = document.getElementById('boton');


function addToTable(doc) {
  tabla.innerHTML +=
    `
    <tr>
    <th scope="row">${doc.data().name}</td>
        <td>${doc.data().logo_url}</td>
        <td>${doc.data().description}</td>
        <td>${doc.data().target_url}</td>
        <td><button class="btn btn-danger" onclick="window.eliminar('${doc.id}')"><i class="fa fa-trash"></i></button></td>
        <td><button class="btn btn-warning" onclick="window.editar('${doc.id}','${doc.data().name}','${doc.data().logo_url}','${doc.data().description}','${doc.data().target_url}')"><i class="fa fa-edit"></i></button></td>
    </tr>
    `
}
/* CRUD */
async function initValues() {
  getAuth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log("User logueado")
      console.log(user)

      //leer datos
      onSnapshot(clientsRef, (querySnapshot) => {
        tabla.innerHTML = ''
        querySnapshot.forEach((doc) => {
          addToTable(doc)
        });
      });

    } else {
      window.location.href = 'login.html';
      console.log("No hay user")
    }
  });
}

function getCurrentValues() {
  return {
    name: name.value,
    logo_url: logoUrl.value,
    description: description.value,
    target_url: targetUrl.value
  }
}
function restartValues() {
  name.value = '';
  logoUrl.value = '';
  description.value = '';
  targetUrl.value = '';
}
async function guardar() {


  try {
    const docRef = await addDoc(clientsRef, getCurrentValues());
    restartValues()

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


//borrar documentos
async function eliminar(id) {
  try {
    deleteDoc(doc(clientsRef, id));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

//editar documentos
//se le pasa el id de cada documento para que le reconozca
//variables id,nombre,carrera donde se almacenara el id,name, carrer

function editar(id, nameValue, logoUrlValue, descriptionValue, targetUrlValue) {
  name.value = nameValue;
  logoUrl.value = logoUrlValue;
  description.value = descriptionValue;
  targetUrl.value = targetUrlValue;
  boton.innerHTML = 'Guardar';
  boton.onclick = async function () {
    //cambiar el boton guardar por editar
    try {
      const result = await updateDoc(doc(clientsRef, id), getCurrentValues());

      console.log("Document successfully updated!");
      boton.innerHTML = 'Agregar';
      restartValues()
      boton.onclick = window.guardar

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

function logOut() {
  signOut(getAuth()).then(() => {
    // Sign-out successful.
    console.log("log out ok ")

  }).catch((error) => {
    window.location.href = '404.html';

  });
}

initValues();
window.guardar = guardar;
window.editar = editar;
window.eliminar = eliminar;
window.logOut = logOut;