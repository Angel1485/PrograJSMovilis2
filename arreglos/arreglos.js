let edadesIzquierdo = [];  // Arreglo para almacenar las edades del lado izquierdo
let edadesDerecho = [];    // Arreglo para almacenar las edades del lado derecho

function pintarArregloIzquierda() {
    // Obtener el elemento de la tabla (o contenedor)
    const tablaIzquierda = document.getElementById('tablaIzquierda');
    
    // Limpiar el contenido actual de la tabla
    tablaIzquierda.innerHTML = '';
    
    // Recorrer el arreglo izquierdo con un for
    for (let i = 0; i < edadesIzquierdo.length; i++) {
        const edad = edadesIzquierdo[i];
        
        // Crear una nueva fila (tr)
        const fila = document.createElement('tr');
        
        // Columna 1: El valor de la edad
        const celdaEdad = document.createElement('td');
        celdaEdad.textContent = edad;
        fila.appendChild(celdaEdad);
        
        // Columna 2: Botón Eliminar
        const celdaBotonEliminar = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'btn-eliminar';
        // Guardar el índice para saber qué elemento eliminar
        botonEliminar.setAttribute('onclick', `eliminarIzquierdo(${i})`);
        celdaBotonEliminar.appendChild(botonEliminar);
        fila.appendChild(celdaBotonEliminar);
        
        // Columna 3: Botón Mover →
        const celdaBotonMover = document.createElement('td');
        const botonMover = document.createElement('button');
        botonMover.textContent = '→';
        botonMover.className = 'btn-mover';
        // Guardar el índice para saber qué elemento mover
        botonMover.setAttribute('onclick', `moverHaciaDerecha(${i})`);
        celdaBotonMover.appendChild(botonMover);
        fila.appendChild(celdaBotonMover);
        
        // Agregar la fila a la tabla
        tablaIzquierda.appendChild(fila);
    }
}

function pintarArregloDerecha() {
    // Obtener el elemento de la tabla (o contenedor)
    const tablaDerecha = document.getElementById('tablaDerecha');
    
    // Limpiar el contenido actual de la tabla
    tablaDerecha.innerHTML = '';
    
    // Recorrer el arreglo derecho con un for
    for (let i = 0; i < edadesDerecho.length; i++) {
        const edad = edadesDerecho[i];
        
        // Crear una nueva fila (tr)
        const fila = document.createElement('tr');
        
        // Columna 1: Botón Mover ←
        const celdaBotonMover = document.createElement('td');
        const botonMover = document.createElement('button');
        botonMover.textContent = '←';
        botonMover.className = 'btn-mover';
        // Guardar el índice para saber qué elemento mover
        botonMover.setAttribute('onclick', `moverHaciaIzquierda(${i})`);
        celdaBotonMover.appendChild(botonMover);
        fila.appendChild(celdaBotonMover);
        
        // Columna 2: El valor de la edad
        const celdaEdad = document.createElement('td');
        celdaEdad.textContent = edad;
        fila.appendChild(celdaEdad);
        
        // Columna 3: Botón Eliminar
        const celdaBotonEliminar = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'btn-eliminar';
        // Guardar el índice para saber qué elemento eliminar
        botonEliminar.setAttribute('onclick', `eliminarDerecho(${i})`);
        celdaBotonEliminar.appendChild(botonEliminar);
        fila.appendChild(celdaBotonEliminar);
        
        // Agregar la fila a la tabla
        tablaDerecha.appendChild(fila);
    }
}

function eliminarDerecho(indice) {
    edadesDerecho.splice(indice, 1);
    pintarArregloDerecha();
}

function agregarEdad() {
    const inputEdad = document.getElementById('edadInput');
    const valorIngresado = inputEdad.value;
    const edad = parseInt(valorIngresado);
    
    if (!isNaN(edad)) {
        edadesIzquierdo.push(edad);
        inputEdad.value = '';
        pintarArregloIzquierda(); // Cambiar pintarArreglos() por esta
    } else {
        alert('Por favor, ingrese una edad válida (número entero)');
    }
}

function eliminarIzquierdo(indice) {
    // Elimina 1 elemento en la posición indicada del arreglo izquierdo
    edadesIzquierdo.splice(indice, 1);
    
    // Vuelve a pintar el arreglo izquierdo
    pintarArregloIzquierda();
}

function moverHaciaDerecha(indice) {
    // Obtener el valor del arreglo izquierdo en esa posición
    const valor = edadesIzquierdo[indice];
    
    // Agregar el valor al arreglo derecho usando push()
    edadesDerecho.push(valor);
    
    // Eliminar el elemento del arreglo izquierdo usando splice()
    edadesIzquierdo.splice(indice, 1);
    
    // Volver a pintar ambos arreglos
    pintarArregloIzquierda();
    pintarArregloDerecha();
}

function moverHaciaIzquierda(indice) {
    // Obtener el valor del arreglo derecho en esa posición
    const valor = edadesDerecho[indice];
    
    // Agregar el valor al arreglo izquierdo usando push()
    edadesIzquierdo.push(valor);
    
    // Eliminar el elemento del arreglo derecho usando splice()
    edadesDerecho.splice(indice, 1);
    
    // Volver a pintar ambos arreglos
    pintarArregloIzquierda();
    pintarArregloDerecha();
}

// // Inicializar cuando la página cargue
// document.addEventListener('DOMContentLoaded', function() {
//     const btnAgregar = document.querySelector('.formulario button');
//     btnAgregar.addEventListener('click', agregarEdad);
//     pintarArregloIzquierda();
// });

