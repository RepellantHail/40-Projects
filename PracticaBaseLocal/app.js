var tablaAlumno = JSON.parse(localStorage.getItem('alumno')) || [];//Var que guarda los valores de la tabla
var registro = JSON.parse(localStorage.getItem('registro')) || 0//Var registro que se usa para editar un registro o validar si se edita o se agrega


cargarPagina(registro)//Se llama esta funcion para cargar los datos de un alumno ya existente y mostrarlo en el formulario

function abrirForm(_registro){  //Funcion que se hace llamar cuando se abre el formulario
  localStorage.setItem('registro',JSON.stringify(_registro))//Se agrega una variable como al principio
  registro = JSON.parse(localStorage.getItem('registro')) || 0
  window.location.assign("alumnos-form.html")//Se abre el formulario
}

function guardar(){
  var bool = false//var para validar su un registro ya existe
  if(validarForm()){//Si el campo registro no está vacio se prosigue
    var objAlumno = JSON.stringify({//Objeto alumno que toma valores del form
      registro: document.getElementById("txtIdAlumno").value,
      nombre: document.getElementById("txtNombreAlumno").value,
      email: document.getElementById("txtEmailAlumno").value,
      grupo: document.getElementById("txtGrupoAlumno").value,
      carrera: document.getElementById("carrerasAlumno").value
    })

    if(registro == 0){//Se checa si se esta agregando un dato o si se edita
      //Se checa si el alumno ya existe
      tablaAlumno.forEach((alumno)=>{
        alumno = JSON.parse(alumno)
        if(alumno.registro == document.getElementById("txtIdAlumno").value)//Si se encuentra el valor en la tabla 
         bool = true
        })
        if(bool){//Si el registro ya existe se muestra un mensaje y se recarga la pagina
          alert("Valor ya existe")
          cargarPagina()
        }else{//Si no existe se agrega a la tabla
          tablaAlumno.push(objAlumno)
        }
    }
    else{//Si se esta editando
      for(const i in tablaAlumno){//Se busca el registro en la tabla y se agregan los datos modificados a la tabla
        var alumno = JSON.parse(tablaAlumno[i])
        if(alumno.registro == registro)
          tablaAlumno[i] = objAlumno
      }
    }
    localStorage.setItem('alumno', JSON.stringify (tablaAlumno))//Se registra la tabla a la base y la variable  de control
    localStorage.setItem('registro',JSON.stringify(0))
  }
}

function llenarTabla(){//Funcion para llenar la tabla
  var rows = '';//Variable que guarda las columnas para despues ingresarlas a la tabla
  tablaAlumno.forEach(function(alumno) {//Se checa cada registro de la tabla, se toman sus valores y se agregan a la variable que se va a ingresar en la tabla
    var alumno = JSON.parse(alumno)//Se convierte el objeto alumno y se agrean sus valoers
    rows += '<tr>';
    rows += '<td>' + alumno.registro + '</td>';
    rows += '<td>' + alumno.nombre + '</td>';
    rows += '<td>' + alumno.email + '</td>';
    rows += '<td>' + alumno.grupo + '</td>';
    rows += '<td>' + alumno.carrera + '</td>';
    rows += '<td>'+ //Se agregan los botones y sus eventos. Cada boton llama su funcion con el respectivo registro del alumno
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

function cargarPagina(_registro){//Funcion que se usa para llenar los valores en el form cuando se edita un registro
 if(_registro > 0){
  tablaAlumno.forEach(function (alumno)  {
    var alumno = JSON.parse(alumno)
    if(alumno.registro == _registro){//Cuando se encuentra el alumno se toman sus datos y se ponen en forms
      document.getElementById("txtIdAlumno").value = alumno.registro
      document.getElementById("txtNombreAlumno").value = alumno.nombre
      document.getElementById("txtEmailAlumno").value = alumno.email
      document.getElementById("txtGrupoAlumno").value = alumno.grupo
      document.getElementById("carrerasAlumno").value = alumno.carrera
    }
  } )
 }
}

function eliminarAlumno(_registro){//Funcion para eliminar alumno
  localStorage.setItem('registro',JSON.stringify(_registro))//Registro para buscar
  for(const i in tablaAlumno){//Se checan los registros de la tabla
    var alumno = JSON.parse(tablaAlumno[i])
    if(alumno.registro == _registro){//Cuando se encuentra el valor en la tabla se elimina y se modica la tabla en la base
      tablaAlumno.splice(i,1)
      localStorage.setItem('alumno',JSON.stringify(tablaAlumno))
    }
  }
}

function validarForm(){//Se revisa si un campo esta vacio en el form
  let validate = document.forms["formAlumno"]["txtIdAlumno"].value//se checa el valor del registro y se guarda en una variable
  if(validate.trim() == ""){//Se muestra un mensaje si el valor esta vacio depende de esto se puede continuar en la funcion guardar
    alert("Campo requerido. Ingrese Registro");
    return false
  }
  else return true
}

function regresarMain(){//Funcion para regresar al main
  window.location.replace("index.html")//Abre la ventana en el Dom
}

function buscarRegistro(){//Funcion que busca si un registro existe en la tabla
  var encontrado = false//Var para validar si existe un registro
  var _registro = document.getElementById("numberSearch").value//Se toma el valor ingresado del input
  if(tablaAlumno == [] || _registro == ""){//Si la tabla está vacia o si no se ha ingresado un valor se muestra este alert
    alert("Campo Vacio")
  }
  else{ 
    tablaAlumno.forEach((alumno)=>{
    alumno = JSON.parse(alumno)
    if(alumno.registro == _registro)//Si se encuentra el valor en la tabla se modifica la variable a true en encontrado
      encontrado = true
    })
  }
  (encontrado)? alert("Alumno Encontrado"): alert("Alumno no existe")//Si existe o no se muestra un alert con su respectivo mensaje
}