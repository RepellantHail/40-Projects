const pacientes = []
const doctorContainer = document.getElementById("elements-container")
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
        pacientes.push(paciente)
        const nestedCollectionRef = collection(paciente.ref, "estudios");
        getDocs(nestedCollectionRef).then((nestedSnapshot) => {
        nestedSnapshot.forEach((nestedDocument) => {
            // Access fields of the nested document
            const nestedData = nestedDocument.data();
            //console.log("Nested Document ID:", nestedDocument.id);
            //console.log("Nested Field Value:", nestedData.descripcion);
        });
        });
    
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
    let estudiosID = pas.id
    console.log(estudiosID)
    pas = pas.data()
    console.log(pas.nombre)
    console.log(pas.edad)
    crearPaciente(pas,estudiosID)
    // You can access other properties of the doc object here
  });
};

function crearPaciente(pas,estudiosID){
    
    
    const divContainer = document.createElement('div')
    divContainer.classList.add('col')

    const cardContainer = document.createElement('div')
    cardContainer.classList.add('card-container')

  const card = document.createElement('div')
    card.classList.add("card")
    card.classList.add("text-bg-secondary")
    card.style.maxWidth = "18rem"

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    cardBody.classList.add('mb-3')

    const cardTitle = document.createElement('h5')
    cardTitle.classList.add('card-header')
    cardTitle.classList.add('fs-3')
    cardTitle.textContent = pas.nombre.toString().toUpperCase()

    const cardList = document.createElement('ul')
    cardList.classList.add('list-group')
    cardList.classList.add('list-group-flush')

    const cardListElement = document.createElement('li')
    cardListElement.classList.add('list-group-item')
    cardListElement.classList.add('text-bg-secondary')
    cardListElement.style.margin = "0px"
    cardListElement.style.padding = "0px"

    const peso = document.createElement('p')
    peso.style.margin = "0px"
    peso.style.padding = "0px"
    peso.classList.add('card-text')
    peso.classList.add('fs-4')
    peso.innerHTML = `<i class="fa-solid fa-weight-scale"></i> Peso: ${pas.peso}kg`

    const edad = document.createElement('p')
    edad.style.margin = "0px"
    edad.style.padding = "0px"
    edad.classList.add('card-text')
    edad.classList.add('fs-4')
    edad.innerHTML = `<i class="fa-solid fa-user-injured"></i> Edad: ${pas.edad} años`

    const btnGroup = document.createElement('div')
    btnGroup.classList.add('btn-group')
    btnGroup.classList.add('p-1')
    btnGroup.setAttribute('role','button')

    const btnActualizar = document.createElement('button')
    btnActualizar.classList.add('btn')
    btnActualizar.classList.add('btn-warning')
    btnActualizar.setAttribute('type','submit')
    btnActualizar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

    const btnEliminar = document.createElement('button')
    btnEliminar.classList.add('btn')
    btnEliminar.classList.add('btn-danger')
    btnEliminar.setAttribute('type','submit')
    btnEliminar.innerHTML = '<i class="fa-solid fa-trash"></i>'


    const button = document.createElement("button");
    button.textContent = "Estudios";
    button.classList.add("btn");
    button.classList.add("btn-dark");
    button.addEventListener("click", () => {
        // Call function to retrieve and display data from the second collection
        retrieveSecondCollectionData(estudiosID);
    });

    btnGroup.appendChild(btnActualizar)
    btnGroup.appendChild(btnEliminar)

    cardListElement.appendChild(peso)
    cardListElement.appendChild(edad)

    cardList.appendChild(cardListElement)
    cardBody.appendChild(cardList)

    card.appendChild(cardTitle)
    card.appendChild(cardBody)
    card.appendChild(btnGroup)
    card.appendChild(button);

    cardContainer.appendChild(card)
    //row.appendChild(cardContainer)
    doctorContainer.appendChild(cardContainer)
}

const retrieveSecondCollectionData = async (pacienteId) => {
    const querySnapshot = await getDocs(
      collection(db, "pacientes", pacienteId, "estudios")
    );
    let nestedInfoHTML = "";
    querySnapshot.forEach((document) => {
      const data = document.data();
      //console.log("ID consulta:", document.id);
      //console.log("Diagnostico:", data.diagnostico);

      nestedInfoHTML += `<p>Estudio ID: ${document.id}</p>><p> Descripción ${data.descripcion}</p><p> Fecha: ${data.fecha}</p>><p> Estudio: ${data.nombre}</p>`;
    });

    // Set the nested collection information in the modal dialog
    const nestedInfoElement = document.getElementById("nestedInfo");
    nestedInfoElement.innerHTML = nestedInfoHTML;
  
    // Show the modal dialog
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
};
const closeBtn = document.getElementsByClassName("close")[0];
closeBtn.addEventListener("click", function () {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
});

fetch("navBar.html")
    .then(response => response.text())
    .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;
    })
    .catch(error => {
    console.error("Error fetching navbar:", error);
    });