var tablaAlumno = localStorage.getItem("alumno")
tablaAlumno = JSON.parse(tablaAlumno)
if(tablaAlumno == null){
  var tablaAlumno = []
}


function abrirForm(idForm){
   //localStorage.setItem("alumno",JSON.stringify(idForm))
   window.location.replace("alumnos-form.html")
}

function guardar(){
    var objAlumno = JSON.stringify({
      registro: 20310067,
      nombre: document.getElementById("txtNombreAlumno").value,
      email: document.getElementById("txtEmailAlumno").value,
      grupo: document.getElementById("txtGrupoAlumno").value,
      carrera: document.getElementById("carrerasAlumno").value
  })
  console.log(objAlumno)
  tablaAlumno.push(objAlumno)
  localStorage.setItem('alumno',JSON.stringify(tablaAlumno))
 // window.location.replace("index.html")
}

function llenarTabla(){
  // Retrieve data from local storage
  // Generate table rows dynamically
  var rows = '';
  tablaAlumno.forEach(function(alumno) {
    var alumno = JSON.parse(alumno)
    rows += '<tr>';
    rows += '<td>' + alumno.registro + '</td>';
    rows += '<td>' + alumno.nombre + '</td>';
    rows += '<td>' + alumno.email + '</td>';
    rows += '<td>' + alumno.grupo + '</td>';
    rows += '<td>' + alumno.carrera + '</td>';
    rows += '<td>'+ 
    "<div class='btn-group btn-group-sm w-auto h-25' role='group' aria-label='Basic example'>"+
    "<button type='button' class='btn btn-warning fw-bold m-1 col-sm-6' onclick='abrirForm("+alumno.registro+")'><i class='fa-solid fa-pencil'></i> Editar</button>"+
    "<button type='button' class='btn btn-danger fw-bold m-1 col-sm-6' onclick='abrirForm("+alumno.registro+")'><i class='fa-solid fa-trash-can'></i> Eliminar</button>"+
    "</div>"
      +'</td>';
    rows += '</tr>';
  });

  // Add generated rows to the table body
  var dataRows = document.getElementById('dataRows');
  dataRows.innerHTML = rows;
}

