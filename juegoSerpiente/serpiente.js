// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;

let direccionActual = "derecha";
let intervaloSerpiente = null;
let comida = { x: 10, y: 10 };
let puntaje = 0;

// ARREGLO DE LA SERPIENTE
// const serpiente = [
//     {x: 5, y: 5},
//     {x: 4, y: 5},
//     {x: 3, y: 5},
//     {x: 2, y: 5},
//     {x: 1, y: 5}
// ];

//Pruebas Obligatorias 
// Ejercicio 1: Horizontal
// const serpiente = [
//     {x: 3, y: 10},
//     {x: 4, y: 10},
//     {x: 5, y: 10},
//     {x: 6, y: 10},
//     {x: 7, y: 10},
//     {x: 8, y: 10}
// ];

// // Ejercicio 2: Prueba en L
// const serpiente = [
//     {x: 5, y: 8},
//     {x: 5, y: 9},
//     {x: 5, y: 10},
//     {x: 6, y: 10},
//     {x: 7, y: 10},
//     {x: 8, y: 10}
// ];

// // Ejercicio 3: Serpiente de 5 cuadros subiendo pegada al borde izquierdo
// const serpiente = [
//     {x: 0, y: 15},
//     {x: 0, y: 14},
//     {x: 0, y: 13},
//     {x: 0, y: 12},
//     {x: 0, y: 11}
// ];

// Ejercicio 4: Cabeza de color diferente
const serpiente = [
    {x: 0, y: 15},
    {x: 0, y: 14},
    {x: 0, y: 13},
    {x: 0, y: 12},
    {x: 0, y: 11}
];


// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  // pintarComida();

  //  // PRUEBA 1: pintarParte(5,5)
  //   pintarParte(5, 5);
    
  //   // PRUEBA 2: pintarParte(10,2)
  //   pintarParte(10, 2);
    
  //   // PRUEBA 3: Cuadrado pegado al borde inferior (y = 23 porque 24*25 = 600, 23*25 = 575)
  //   pintarParte(5, 23);
    
  //   // PRUEBA 4: Cuadrado pegado al borde derecho (x = 23)
  //   pintarParte(23, 5);
    
  //   // PRUEBA 5: Cuadrado pegado al borde izquierdo (x = 0)
  //   pintarParte(0, 10);
    
  //   // PRUEBA 6: Cuadrado en cualquier esquina (esquina superior derecha)
  //   pintarParte(23, 0);

}

function dibujarTablero()
{
    ctx.strokeStyle = "#2b6dd8";

    // Líneas verticales
    for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA)
    {
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,canvas.height);
        ctx.stroke();
    }

    // Líneas horizontales
    for(let y = 0; y <= canvas.height; y += TAMANIO_CELDA)
    {
        ctx.beginPath();
        ctx.moveTo(0,y);
        ctx.lineTo(canvas.width,y);
        ctx.stroke();
    }
}

// =========================
// FUNCIONES DE LA SERPIENTE
// =========================

function pintarParte(lineaX, lineaY) {
    // Calcular posición real en el canvas
    const x = lineaX * TAMANIO_CELDA;
    const y = lineaY * TAMANIO_CELDA;
    
    // Pintar el cuadrado (por ahora solo verde para probar)
    ctx.fillStyle = "#4ade80";
    ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
    
    // Dibujar borde del cuadrado
    ctx.strokeStyle = "#1f2937";
    ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

// function pintarSerpiente() {
//     for(let i = 0; i < serpiente.length; i++) {
//         const parte = serpiente[i];
//         pintarParte(parte.x, parte.y);
//     }
// }

function pintarSerpiente() {
    for(let i = 0; i < serpiente.length; i++) {
        const parte = serpiente[i];
        
        // Guardar el color actual para restaurarlo después
        const colorOriginal = ctx.fillStyle;
        
        if(i === 0) {
            // La cabeza (primer elemento) es amarilla
            ctx.fillStyle = "#facc15";
        } else {
            // El cuerpo es rojo
            ctx.fillStyle = "#ef4444";
        }
        
        // Calcular posición real
        const x = parte.x * TAMANIO_CELDA;
        const y = parte.y * TAMANIO_CELDA;
        
        ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
        ctx.strokeStyle = "#1f2937";
        ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
        
        // Restaurar color original
        ctx.fillStyle = colorOriginal;
    }
}

function moverDerecha() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x + 1, y: cabeza.y };
    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function moverIzquierda() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x - 1, y: cabeza.y };
    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function moverArriba() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x, y: cabeza.y - 1 };
    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function moverAbajo() {
    const cabeza = serpiente[0];
    const nuevaCabeza = { x: cabeza.x, y: cabeza.y + 1 };
    serpiente.unshift(nuevaCabeza);
    serpiente.pop();
}

function cambiarDireccion(direccion) {
    // Evitar que la serpiente vaya en dirección contraria
    if (direccion === "derecha" && direccionActual !== "izquierda") {
        direccionActual = "derecha";
    } else if (direccion === "izquierda" && direccionActual !== "derecha") {
        direccionActual = "izquierda";
    } else if (direccion === "arriba" && direccionActual !== "abajo") {
        direccionActual = "arriba";
    } else if (direccion === "abajo" && direccionActual !== "arriba") {
        direccionActual = "abajo";
    }
}

function moverSerpiente() {
    // Primero verificar si atrapó comida ANTES de mover
    const atrapo = atrapaComida();
    
    // Mover según la dirección (si atrapó comida, pasar true para que crezca)
    if (direccionActual === "derecha") {
        moverDerecha(atrapo);
    } else if (direccionActual === "izquierda") {
        moverIzquierda(atrapo);
    } else if (direccionActual === "arriba") {
        moverArriba(atrapo);
    } else if (direccionActual === "abajo") {
        moverAbajo(atrapo);
    }
    
    // Si atrapó comida
    if (atrapo) {
        puntaje++;
        document.getElementById("puntaje").innerText = puntaje;
        generarComida();
        
        // Verificar que la nueva comida no esté dentro de la serpiente
        while (comidaEnSerpiente()) {
            generarComida();
        }
    }
    
    pintarSerpiente();
    pintarComida();
}

function comidaEnSerpiente() {
    for (let i = 0; i < serpiente.length; i++) {
        if (serpiente[i].x === comida.x && serpiente[i].y === comida.y) {
            return true;
        }
    }
    return false;
}

function pintarComida() {
    const x = comida.x * TAMANIO_CELDA;
    const y = comida.y * TAMANIO_CELDA;
    
    ctx.fillStyle = "#facc15"; // Color amarillo para la comida
    ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
    ctx.strokeStyle = "#1f2937";
    ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

// function generarComida() {
//     const maxX = canvas.width / TAMANIO_CELDA;
//     const maxY = canvas.height / TAMANIO_CELDA;
    
//     comida = {
//         x: Math.floor(Math.random() * maxX),
//         y: Math.floor(Math.random() * maxY)
//     };
// }

function generarComida() {
    const maxX = canvas.width / TAMANIO_CELDA;
    const maxY = canvas.height / TAMANIO_CELDA;
    
    let nuevaComida;
    let colision;
    
    do {
        colision = false;
        nuevaComida = {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        };
        
        // Verificar que no esté en la serpiente
        for (let i = 0; i < serpiente.length; i++) {
            if (serpiente[i].x === nuevaComida.x && serpiente[i].y === nuevaComida.y) {
                colision = true;
                break;
            }
        }
    } while (colision);
    
    comida = nuevaComida;
}

function atrapaComida() {
    const cabeza = serpiente[0];
    return cabeza.x === comida.x && cabeza.y === comida.y;
}

function crecerSerpiente() {
    const ultimo = serpiente[serpiente.length - 1];
    const penultimo = serpiente[serpiente.length - 2];
    
    // Agregar un nuevo segmento en la dirección opuesta al movimiento
    let nuevoSegmento;
    
    if (direccionActual === "derecha") {
        nuevoSegmento = { x: ultimo.x - 1, y: ultimo.y };
    } else if (direccionActual === "izquierda") {
        nuevoSegmento = { x: ultimo.x + 1, y: ultimo.y };
    } else if (direccionActual === "arriba") {
        nuevoSegmento = { x: ultimo.x, y: ultimo.y + 1 };
    } else if (direccionActual === "abajo") {
        nuevoSegmento = { x: ultimo.x, y: ultimo.y - 1 };
    }
    
    serpiente.push(nuevoSegmento);
}

function iniciarJuego() {
    if (intervaloSerpiente === null) {
        intervaloSerpiente = setInterval(moverSerpiente, 500);
        document.getElementById("estado").innerText = "Jugando";
        document.getElementById("mensaje").innerText = "¡Juego en curso!";
    }
}

function pausarJuego() {
    if (intervaloSerpiente !== null) {
        clearInterval(intervaloSerpiente);
        intervaloSerpiente = null;
        document.getElementById("estado").innerText = "Pausado";
        document.getElementById("mensaje").innerText = "Juego pausado. Presiona Iniciar para continuar.";
    }
}

function reiniciarJuego() {
    // Detener el intervalo si está corriendo
    if (intervaloSerpiente !== null) {
        clearInterval(intervaloSerpiente);
        intervaloSerpiente = null;
    }
    
    // Reiniciar la serpiente
    serpiente.length = 0;
    serpiente.push({ x: 5, y: 5 });
    serpiente.push({ x: 4, y: 5 });
    serpiente.push({ x: 3, y: 5 });
    serpiente.push({ x: 2, y: 5 });
    serpiente.push({ x: 1, y: 5 });
    
    // Reiniciar variables
    direccionActual = "derecha";
    puntaje = 0;
    document.getElementById("puntaje").innerText = "0";
    document.getElementById("estado").innerText = "Listo";
    document.getElementById("mensaje").innerText = "Juego reiniciado. Presiona Iniciar.";
    
    // Generar comida aleatoria
    generarComida();
    
    // Dibujar todo
    dibujarTodo();
}
