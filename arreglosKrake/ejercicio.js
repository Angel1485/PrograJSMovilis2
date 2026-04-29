let notas = [];

function agregarNota(nota) {
    notas.push(nota);
    mostrarNotas();
}

function agregarElemento() {
    notas.push(5);
    notas.push(10);
    console.log(notas.length);
}

function recorrerArreglo() {
    let notaR;
    for (let indice = 0; indice < notas.length; indice++) {
        notaR = notas[indice];
        console.log(notaR);
    }
}

function probarAgregar() {
    let notaRecupera;
    notaRecupera = recuperarInt("txtNota");
    agregarNota(notaRecupera);
}

function calcularPromedio() {
  let sumaNotas = 0;
  let promedio = 0;

  for (let i = 0; i < notas.length; i++) {
    sumaNotas += notas[i];
  }
  console.log(sumaNotas);
  
  promedio = sumaNotas / notas.length;
  console.log(promedio);
}

function generarTabla (){
    let contenidoTabla = "";
    let componenteTabla = document.getElementById("divTable");
    contenidoTabla += "<table> <tr> <td> 1 </td> </tr> " + 
                             " <tr> <td> 2 </td> </tr> " +
                             " <tr> <td> 3 </td> </tr> " +
                      "</table>";
    componenteTabla.innerHTML = contenidoTabla; 
}

function mostrarNotas (){
    let componenteTabla = document.getElementById("divTable");
    let contenidoTabla = "<table><tr><td>NOTAS</td></tr>";
    let miNota;
    for (let i = 0; i < notas.length; i++) {
        miNota = notas[i];
        contenidoTabla += "<tr><td>";
        contenidoTabla += miNota ;
        contenidoTabla += "</tr></td>";
    }
    contenidoTabla += "</table>";
    componenteTabla.innerHTML = contenidoTabla; 
}
