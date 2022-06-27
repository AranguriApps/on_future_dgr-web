import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import firebaseConfig from './firebaseConfig'

initializeApp(firebaseConfig);
const db = getFirestore();
const servicesRef = collection(db, "services");
const tabla = document.getElementById('tabla');
const title = document.getElementById('title');
const description = document.getElementById('description');
const imageUrl = document.getElementById('image_url');
const targetText = document.getElementById('target_text');
const targetUrl = document.getElementById('target_url');
const contactTitle = document.getElementById('contact_title');
const contactMessage = document.getElementById('contact_message');


function addToTable(doc) {
  tabla.innerHTML +=
    `
    <tr>
    <th scope="row">${doc.data().title}</td>
        <td>${doc.data().description}</td>
        <td>${doc.data().image_url}</td>
        <td>${doc.data().target_text}</td>
        <td>${doc.data().target_url}</td>
        <td>${doc.data().contact_title}</td>
        <td>${doc.data().contact_message}</td>
        <td><button class="btn btn-danger" onclick="window.eliminar('${doc.id}')"><i class="fa fa-trash"></i></button></td>
        <td><button class="btn btn-warning" onclick="window.editar('${doc.id}','${doc.data().title}','${doc.data().description}','${doc.data().image_url}','${doc.data().target_text}','${doc.data().target_url}','${doc.data().contact_title}','${doc.data().contact_message}')"><i class="fa fa-edit"></i></button></td>
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
      onSnapshot(servicesRef, (querySnapshot) => {
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

function restartValues() {
  title.value = ''
  description.value = ''
  imageUrl.value = ''
  targetText.value = ''
  targetUrl.value = ''
  contactTitle.value = ''
  contactMessage.value = ''
}
function getCurrentValues() {
  return {
    title: title.value,
    description: description.value,
    image_url: imageUrl.value,
    target_text: targetText.value,
    target_url: targetUrl.value,
    contact_title: contactTitle.value,
    contact_message: contactMessage.value
  }
}
//Agregar documentos de manera dinamica
//las variables nombre y carrera son las que se reconoce del id en index.html
//Las variables que se encuentran en db.collection name y career, son los campos de la base de datos de firestore.

//funcion guardar, cuando se hace clic en guardar() se ejecuta el sgt codigo
async function guardar() {
  try {
    const docRef = await addDoc(servicesRef, getCurrentValues());
    console.log("Document written with ID: ", docRef);
    //reiniciar los inputs. Una vez que se guarda, lo limpie.
    restartValues()
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


//borrar documentos
async function eliminar(id) {
  try {
    deleteDoc(doc(servicesRef, id));
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}

//editar documentos
//se le pasa el id de cada documento para que le reconozca
//variables id,nombre,carrera donde se almacenara el id,name, carrer

function editar(id, titleValue, descValue, imageValue, targetTextValue, targetUrlValue, contactTitleValue, contactMessageValue) {
  title.value = titleValue
  description.value = descValue
  imageUrl.value = imageValue
  targetText.value = targetTextValue
  targetUrl.value = targetUrlValue
  contactTitle.value = contactTitleValue
  contactMessage.value = contactMessageValue
  //cambiar el boton guardar por editar
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Guardar';
  //despues de hacer click en editar se ejecuta ls sgt funcion

  boton.onclick = async function () {
    try {
      const clientRef = doc(servicesRef, id);
      console.log(clientRef)
      const result = await updateDoc(clientRef, getCurrentValues());


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