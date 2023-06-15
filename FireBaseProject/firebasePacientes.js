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
    btnActualizar.setAttribute('data-bs-toggle','modal')
    btnActualizar.setAttribute('data-bs-target','#editModal')
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
    doctorContainer.appendChild(crearModalEdit(pas.nombre,pas.peso,pas.edad))
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

function crearModalEdit(nombre,cedula,especialidad){

    // Modal

    const divModalFade = document.createElement('div')
    divModalFade.classList.add('modal')
    divModalFade.classList.add('fade')
    divModalFade.setAttribute('id', 'editModal')
    divModalFade.setAttribute('tabindex', '-1')
    divModalFade.setAttribute('aria-hidden', 'true')

    const modalDialog = document.createElement('div')
    modalDialog.classList.add('modal-dialog')

    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')

    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')

    const modalTitle = document.createElement('h2')
    modalTitle.classList.add('modal-title')
    modalTitle.classList.add('fs-5')
    modalTitle.innerHTML = nombre

    const modalEditBtnClose = document.createElement('button')
    modalEditBtnClose.classList.add('btn-close')
    modalEditBtnClose.setAttribute('data-bs-dismiss','modal')
    modalEditBtnClose.setAttribute('aria-label','Close')

    const editModalBody = document.createElement('div')
    editModalBody.classList.add('modal-body')
    editModalBody.innerHTML = `<input class="form-control" value="${nombre}"><input class="form-control" value="${cedula}"><input class="form-control" value="${especialidad}">`

    const editModalFooter = document.createElement('div')
    editModalFooter.classList.add('modal-footer')

    const btnCloseModalFooter = document.createElement('button')
    btnCloseModalFooter.classList.add('btn')
    btnCloseModalFooter.classList.add('btn-secondary')
    btnCloseModalFooter.setAttribute('data-bs-dismiss','modal')
    btnCloseModalFooter.innerText = "Cerrar"

    const btnGuardarModalFooter = document.createElement('button')
    btnGuardarModalFooter.classList.add('btn')
    btnGuardarModalFooter.classList.add('btn-primary')
    btnGuardarModalFooter.innerText = "Guardar Cambios"

    editModalFooter.appendChild(btnCloseModalFooter)
    editModalFooter.appendChild(btnGuardarModalFooter)
    modalHeader.appendChild(modalTitle)
    modalHeader.appendChild(modalEditBtnClose)
    modalContent.appendChild(modalHeader)
    modalContent.appendChild(editModalBody)
    modalContent.appendChild(editModalFooter)
    modalDialog.appendChild(modalContent)
    divModalFade.appendChild(modalDialog)
    
    // End of modal
    return  divModalFade
}

fetch("navBar.html")
    .then(response => response.text())
    .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;
    })
    .catch(error => {
    console.error("Error fetching navbar:", error);
    });