const doctores = []
const consultas = []
const doctorContainer = document.querySelector(".elements-container")
const collectionName = "doctores"

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
    querySnapshot.forEach((doctor) => {
        doctores.push(doctor)
        consultas.push()
        // Acceso a consultas
        const nestedCollectionRef = collection(doctor.ref, "consultas");
        getDocs(nestedCollectionRef).then((nestedSnapshot) => {
        nestedSnapshot.forEach((nestedDocument) => {
            // Access fields of the nested document
            const nestedData = nestedDocument.data();
            console.log("Nested Document ID:", nestedDocument.id);
            console.log("Nested Field Value:", nestedData.diagnostico);
        });
        });

        //console.log(doctor.id, " => ", doctor.data());
    });
    // Call the function to handle the retrieved data
    handleDataDocs();
};

// Call the getData function to retrieve and display data
getData().catch((error) => {
    console.error("Error getting documents: ", error);
});


const handleDataDocs = () => {
    doctores.forEach((doc) => {
    let consultaID = doc.id
    console.log("Id: "+consultaID)
    doc = doc.data()
    console.log("Cedula: ", doc.cedula);
    console.log("Nombre: ", doc.nombre);
    console.log("Especialidad: ", doc.especialidad);
    crearDoctor(doc,consultaID)
    // You can access other properties of the doc object here
  });
};

function crearDoctor(doctor,consultaID){
    const row = document.createElement('div')
    row.classList.add('row')
    row.classList.add('row-cols-1')
    row.classList.add('row-cols-md-3')
    row.classList.add('g-4')
    
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
    cardTitle.textContent = doctor.nombre.toString().toUpperCase()

    const cardList = document.createElement('ul')
    cardList.classList.add('list-group')
    cardList.classList.add('list-group-flush')

    const cardListElement = document.createElement('li')
    cardListElement.classList.add('list-group-item')
    cardListElement.classList.add('text-bg-secondary')
    cardListElement.style.margin = "0px"
    cardListElement.style.padding = "0px"

    const cedula = document.createElement('p')
    cedula.style.margin = "0px"
    cedula.style.padding = "0px"
    cedula.classList.add('card-text')
    cedula.classList.add('fs-4')
    cedula.textContent = `Cedula : ${doctor.cedula}`

    const especialidad = document.createElement('p')
    especialidad.style.margin = "0px"
    especialidad.style.padding = "0px"
    especialidad.classList.add('card-text')
    especialidad.classList.add('fs-4')
    especialidad.textContent = `Especialidad: ${doctor.especialidad}`

    const button = document.createElement("button");
    button.textContent = "Consultas";
    button.classList.add("btn");
    button.classList.add("btn-dark");
    button.addEventListener("click", () => {
        // Call function to retrieve and display data from the second collection
        retrieveSecondCollectionData(consultaID);
    });

    cardListElement.appendChild(cedula)
    cardListElement.appendChild(especialidad)

    cardList.appendChild(cardListElement)
    cardBody.appendChild(cardList)

    card.appendChild(cardTitle)
    card.appendChild(cardBody)
    card.appendChild(button);

    cardContainer.appendChild(card)
    row.appendChild(cardContainer)
    doctorContainer.appendChild(row)
}

const retrieveSecondCollectionData = async (doctorId) => {
    const querySnapshot = await getDocs(
      collection(db, "doctores", doctorId, "consultas")
    );
    let nestedInfoHTML = "";
    querySnapshot.forEach((document) => {
      const data = document.data();
      console.log("ID consulta:", document.id);
      console.log("Diagnostico:", data.diagnostico);

      nestedInfoHTML += `<p>Consulta ID: ${document.id}</p><p>Paciente: ${data.pacienteId}</p><p> Diagnostico: ${data.diagnostico}</p><p> Fecha ${data.fecha}</p><p> Tratamiento: ${data.tratamiento}</p>`;
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