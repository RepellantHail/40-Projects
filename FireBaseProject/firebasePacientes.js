const pacientes = []
const doctorContainer = document.querySelector(".elements-container")
const collectionName = "pacientes"

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyDB7qoDsIoQElNJhfkxvujP4jJHnrbrEF0",
        authDomain: "hospital-api-db2.firebaseapp.com",
        projectId: "hospital-api-db2",
        storageBucket: "hospital-api-db2.appspot.com",
        messagingSenderId: "877191925042",
        appId: "1:877191925042:web:e8caa1e5496e35d177db2b"
    };
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Retrieve documents from a collection
const getData = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((paciente) => {
    pacientes.push(paciente.data())
    //console.log(doctor.id, " => ", doctor.data());
    });
    // Call the function to handle the retrieved data
    handleDataPacients();
};

// Call the getData function to retrieve and display data
getData().catch((error) => {
    console.error("Error getting documents: ", error);
});


const handleDataPacients = () => {
    pacientes.forEach((pas) => {
    console.log("Cedula: ", pas.cedula);
    console.log("Nombre: ", pas.nombre);
    console.log("Especialidad: ", pas.especialidad);
    crearPaciente(pas)
    // You can access other properties of the doc object here
  });
};

function crearPaciente(pas){
    const row = document.createElement('div')
    row.classList.add('row')
    
    const divContainer = document.createElement('div')
    divContainer.classList.add('col-sm-6')

    const cardContainer = document.createElement('div')
    cardContainer.classList.add('card-container')

    const card = document.createElement('div')
    card.classList.add("card")
    card.classList.add("text-bg-primary")
    card.style.maxWidth = "18rem"

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardBody.classList.add('text-bg-primary')
    cardBody.classList.add('mb-3')

    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-header')
    cardTitle.classList.add('fs-3')
    cardTitle.textContent = pas.nombre

    const cardList = document.createElement('ul')
    cardList.classList.add('list-group')
    cardList.classList.add('list-group-flush')

    const cardListElement = document.createElement('li')
    cardListElement.classList.add('list-group-item')
    cardListElement.style.margin = "0px"
    cardListElement.style.padding = "0px"

    const peso = document.createElement('p')
    peso.style.margin = "0px"
    peso.style.padding = "0px"
    peso.classList.add('card-text')
    peso.classList.add('fs-4')
    peso.textContent = `Peso: ${pas.peso}kg`

    const edad = document.createElement('p')
    edad.style.margin = "0px"
    edad.style.padding = "0px"
    edad.classList.add('card-text')
    edad.classList.add('fs-4')
    edad.textContent = `Edad: ${pas.edad} años`

    cardListElement.appendChild(peso)
    cardListElement.appendChild(edad)

    cardList.appendChild(cardListElement)
    cardBody.appendChild(cardList)

    card.appendChild(cardTitle)
    card.appendChild(cardBody)

    cardContainer.appendChild(card)
    row.appendChild(cardContainer)
    doctorContainer.appendChild(row)
}

fetch("navBar.html").then(response => response.text()).then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;
    }).catch(error => {
        console.error("Error fetching navbar:", error);
    });