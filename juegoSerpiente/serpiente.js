// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25;

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