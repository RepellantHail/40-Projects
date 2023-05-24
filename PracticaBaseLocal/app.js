var tablaAlumno = JSON.parse(localStorage.getItem('alumno')) || [];

var registro = JSON.parse(localStorage.getItem('registro')) || []

cargarPagina(registro)


function abrirForm(_registro){  
  localStorage.setItem('registro',JSON.stringify(_registro))
  window.location.assign("alumnos-form.html")
}

function guardar(){
    var objAlumno = JSON.stringify({
      registro: document.getElementById("txtIdAlumno").value,
      nombre: document.getElementById("txtNombreAlumno").value,
      email: document.getElementById("txtEmailAlumno").value,
      grupo: document.getElementById("txtGrupoAlumno").value,
      carrera: document.getElementById("carrerasAlumno").value
  })
  if(registro == 0){
    tablaAlumno.push(objAlumno)
  } else{
    for(const i in tablaAlumno){
      var alumno = JSON.parse(tablaAlumno[i])
      if(alumno.registro == registro){
        tablaAlumno[i] = objAlumno
      }
    }
  }
  localStorage.setItem('alumno',JSON.stringify(tablaAlumno))
  window.location.replace("index.html")
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
    "<div class='btn-group btn-group-sm w-auto h-50' role='group' aria-label='Basic example'>"+
    "<button type='button' class='btn btn-warning fw-bold m-1' onclick='abrirForm("+alumno.registro+")'><i class='fa-solid fa-pencil'></i> Editar</button>"+
    "<button type='button' class='btn btn-danger fw-bold m-1 ' onclick='eliminarAlumno("+alumno.registro+")'><i class='fa-solid fa-trash-can'></i> Eliminar</button>"+
    "</div>"
      +'</td>';
    rows += '</tr>';
  });

  // Add generated rows to the table body
  var dataRows = document.getElementById('dataRows');
  dataRows.innerHTML = rows;
}

function cargarPagina(_registro){
 if(_registro > 0){
  tablaAlumno.forEach(function (alumno)  {
    var alumno = JSON.parse(alumno)
    if(alumno.registro == _registro){
      document.getElementById("txtIdAlumno").value = alumno.registro
      document.getElementById("txtNombreAlumno").value = alumno.nombre
      document.getElementById("txtEmailAlumno").value = alumno.email
      document.getElementById("txtGrupoAlumno").value = alumno.grupo
      document.getElementById("carrerasAlumno").value = alumno.carrera
    }
  } )
 }
}

function eliminarAlumno(_registro){
  localStorage.setItem('registro',JSON.stringify(_registro))
  for(const i in tablaAlumno){
    var alumno = JSON.parse(tablaAlumno[i])
    if(alumno.registro == _registro){
      tablaAlumno.splice(i,1)
      localStorage.setItem('alumno',JSON.stringify(tablaAlumno))
    }
  }
}