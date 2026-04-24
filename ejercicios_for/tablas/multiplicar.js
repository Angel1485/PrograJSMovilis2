// function generarTablas_Probando() {
//     let contenedor = document.getElementById("tablaContenedor");
//     contenedor.innerHTML = `<h1>PROBANDO</h1>`;
// }

// function generarTablas_ParteDos() {
//     let contenedor = document.getElementById("tablaContenedor");
//     let contenido = "";
//     let tabla = 5; // Cambia este número para la tabla que quieras: 3, 5, 7, etc.
    
//     for(let i = 1; i <= 10; i++) {
//         contenido += `<div class="fila">${tabla} × ${i} = ${tabla * i}</div>`;
//     }
    
//     contenedor.innerHTML = contenido;
// }

// function generarTablas() {

//     let contenedor = document.getElementById("tablaContenedor");
//     let numero = document.getElementById("txtNumero").value;
    
//     if(numero === "" || isNaN(numero)) {
//         numero = 3;
//         document.getElementById("txtNumero").value = 3;
//     }
    
//     // Variable para almacenar el contenido HTML
//     let contenido = "";
    
//     // Actualizar el título
//     let titulo = document.querySelector("h1");
//     titulo.innerHTML = `Tabla de Multiplicar del ${numero}`;
    
//     // Usar un for para construir la tabla dinámicamente
//     for(let i = 1; i <= 10; i++) {
//         contenido += `<div class="fila">${numero} × ${i} = ${numero * i}</div>`;
//     }
    
//     // Insertar el contenido en el contenedor
//     contenedor.innerHTML = contenido;
// }

//Experiencia de usurio / validaciones
function generarTablas() {
    // Obtener elementos
    let contenedor = document.getElementById("tablaContenedor");
    let numeroInput = document.getElementById("txtNumero");
    let errorMsg = document.getElementById("errorMessage");
    let infoMsg = document.getElementById("infoMessage");
    
    // Obtener el número
    let numero = numeroInput.value;
    
    // Validaciones con mensajes de ayuda
    if(numero === "" || isNaN(numero)) {
        // Mostrar mensaje de error
        errorMsg.classList.add("show");
        infoMsg.style.display = "none";
        
        // Ocultar error después de 3 segundos
        setTimeout(() => {
            errorMsg.classList.remove("show");
            infoMsg.style.display = "flex";
        }, 3000);
        
        numeroInput.value = 3;
        numero = 3;
    } else {
        // Ocultar error si estaba visible
        errorMsg.classList.remove("show");
        infoMsg.style.display = "flex";
    }
    
    // Convertir a número entero
    numero = parseInt(numero);
    
    // Validar rango (mensaje de ayuda para números grandes)
    if(numero > 20) {
        infoMsg.innerHTML = "💡 ¡Vaya! Números grandes son un reto. ¡Tú puedes! 💪";
        setTimeout(() => {
            infoMsg.innerHTML = "💡 ¡Tip: Prueba con números del 1 al 12 para empezar!";
        }, 4000);
    } else if(numero < 1) {
        infoMsg.innerHTML = "💡 ¡Los números positivos son más divertidos! Prueba con 1, 2 o 3 ✨";
        setTimeout(() => {
            infoMsg.innerHTML = "💡 ¡Tip: Prueba con números del 1 al 12 para empezar!";
        }, 4000);
        numero = 3;
        numeroInput.value = 3;
    } else {
        infoMsg.innerHTML = `✨ ¡Excelente! Estás aprendiendo la tabla del ${numero} ✨`;
        setTimeout(() => {
            infoMsg.innerHTML = "💡 ¡Tip: Prueba con números del 1 al 12 para empezar!";
        }, 3000);
    }
    
    // Actualizar el título
    let titulo = document.querySelector("h1");
    titulo.innerHTML = `Tabla de Multiplicar del ${numero}`;
    
    // Generar contenido de la tabla con header
    let contenido = "";
    contenido += `<div class="tabla-header">`;
    contenido += `<span>📖 Tabla de multiplicar del ${numero}</span>`;
    contenido += `</div>`;
    
    // Usar un for para construir la tabla dinámicamente
    for(let i = 1; i <= 10; i++) {
        contenido += `<div class="fila">${numero} × ${i} = ${numero * i}</div>`;
    }
    
    // Insertar el contenido en el contenedor
    contenedor.innerHTML = contenido;
}

// Permitir presionar Enter en el input
document.addEventListener("DOMContentLoaded", function() {
    let input = document.getElementById("txtNumero");
    if(input) {
        input.addEventListener("keypress", function(event) {
            if(event.key === "Enter") {
                event.preventDefault();
                generarTablas();
            }
        });
    }
});