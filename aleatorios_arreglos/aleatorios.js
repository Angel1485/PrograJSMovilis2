// Paso 2: Función que retorna número aleatorio entre 1 y 100
function generarNumeroAleatorio() {
    let numero = Math.floor(Math.random() * 100) + 1;
    return numero;
}

// Paso 3: Función generarAleatorios
function generarAleatorios() {
    let aleatorios = [];
    
    let tamaño = recuperarInt("txtTamaño");
    
    // Validar que el número esté entre 5 y 20
    if (tamaño < 5 || tamaño > 20 || isNaN(tamaño)) {
        alert("Por favor, ingrese un número válido entre 5 y 20");
        return;
    }
    
    for (let i = 0; i < tamaño; i++) {
        console.log("Índice: " + i);
        let numeroAleatorio = generarNumeroAleatorio();
        aleatorios.push(numeroAleatorio);
    }
    
    mostrarResultados(aleatorios);
}

// Paso 4: Función mostrarResultados
function mostrarResultados(arregloNumeros) {
    let componenteTabla = document.getElementById("divTable");
    let contenidoTabla = "<table border='1'>";
    contenidoTabla += "<tr> <th> Índice </th> <th> Número Aleatorio </th> </tr>";
    
    for (let i = 0; i < arregloNumeros.length; i++) {
        contenidoTabla += "<tr>";
        contenidoTabla += "<td>" + i + "</td>";
        contenidoTabla += "<td>" + arregloNumeros[i] + "</td>";
        contenidoTabla += "</tr>";
    }
    contenidoTabla += "</table>";
    componenteTabla.innerHTML = contenidoTabla;
}