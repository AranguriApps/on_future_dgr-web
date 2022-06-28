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
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebaseConfig from '../js/firebaseConfig'

initializeApp(firebaseConfig);


const clientCarousel = document.getElementById('carousel-container');
const containerClients = document.getElementById('container-clients')
const servicesContainer = document.getElementById('services-container')

function addToCarousel(doc, extra) {
  console.log(doc.data().name)
  clientCarousel.innerHTML +=
    `
  <div class="carousel-item ${extra} py-5">
                      <div class="col-12 col-md-3 d-flex">
                              <div class="card-img">
                                  <img src="${doc.data().logo_url}" class="img-fluid-logo">
                              </div>
                      </div>
                  </div>
  `
}

function addToFixedList(doc) {
  containerClients.innerHTML +=
    `
  <div class="col-md-3 py-5">
        <div class="carfd">
            <div class="card-img">
                <img src="${doc.data().logo_url}" class="img-fluid-logo">
            </div>
        </div>
    </div>`
}

function addService(doc) {

  servicesContainer.innerHTML +=
    `<div class="col-12 col-md-6 mb-3">
  <div class="card">
    <img
      src="${doc.data().image_url}"
      class="card-img-top"
      alt="Image service"
    />
    <div class="card-body">
      <h5 class="card-title"> ${doc.data().title}</h5>
      <p class="card-text">
        ${doc.data().description}
      </p>
      <a href="#" class="btn btn-primary">${doc.data().target_text}</a>
    </div>
  </div>
</div>`
}

async function main() {
  console.log("inside main")
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  try {
    const clientsRef = collection(db, "clients");
    const servicesRef = collection(db, "services");

    onSnapshot(servicesRef, (querySnapshot) => {
      servicesContainer.innerHTML = ''

      querySnapshot.forEach((doc) => {
        addService(doc)
      })
    })



    //leer datos
    onSnapshot(clientsRef, (querySnapshot) => {
      clientCarousel.innerHTML = ''

      var emptyList = true
      var extraClass = ""
      const listSize = querySnapshot.size
      if (listSize <= 4) {
        containerClients.innerHTML = ''

      }

      querySnapshot.forEach((doc) => {
        if (emptyList) {
          extraClass = "active"
          emptyList = false
        } else {
          extraClass = ""
        }
        console.log(listSize)
        if (listSize > 4) {
          addToCarousel(doc, extraClass)
        } else {
          addToFixedList(doc)
        }

      });

      let items = document.querySelectorAll('.carousel .carousel-item')

      console.log("items" + items)
      const minPerSlide = 4
      if (querySnapshot.size > 0)
        items.forEach((el) => {
          let next = el.nextElementSibling
          for (var i = 1; i < minPerSlide; i++) {
            if (!next) {
              // wrap carousel by using first child
              next = items[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
          }
        })

    });




  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

function setIntervalValue(value) {
  document.getElementById("recipeCarousel").setAttribute('data-bs-interval', value);
  console.log(value)
}

main()
console.log("after main")
