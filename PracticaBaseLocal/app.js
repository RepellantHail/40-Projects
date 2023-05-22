const alumno = [{
    registro: 20310068,
    nombre: 'Luis Modesto',
    email: 'a20310068@ceti.mx',
    grupo: '5M',
    carrera: 'Desarrollo De Software'
}]

alumno.push({
  registro: 20310069,
    nombre: 'Maria Sanchez',
    email: 'a20310069@ceti.mx',
    grupo: '4M',
    carrera: 'Ingenieria Civil'
},{
  registro: 20310070,
    nombre: 'Carlos Hernandez',
    email: 'a20310070@ceti.mx',
    grupo: '6M',
    carrera: 'Industrial'
})

localStorage.setItem('alumno',JSON.stringify(alumno))


// Retrieve data from local storage
var data = JSON.parse(localStorage.getItem('alumno')) || [];

// Generate table rows dynamically
var rows = '';
data.forEach(function(item) {
  rows += '<tr>';
  rows += '<td>' + item.registro + '</td>';
  rows += '<td>' + item.nombre + '</td>';
  rows += '<td>' + item.email + '</td>';
  rows += '<td>' + item.grupo + '</td>';
  rows += '<td>' + item.carrera + '</td>';
  rows += '</tr>';
});

// Add generated rows to the table body
var dataRows = document.getElementById('dataRows');
dataRows.innerHTML = rows;