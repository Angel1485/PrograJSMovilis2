
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

// // Recupera el componente
// let componente = document.getElementById("parametros");
// // Recupera la lista de clases del componente
// let listaClass = componente.classList;
// // Agrega o elimina la clase
// listaClass.add("activa");
// listaClass.remove("activa");

document.getElementById("parametros").classList.add("activa");
document.getElementById("parametros").classList.remove("activa");

function ocultarSecciones() {
    const secciones = document.querySelectorAll('section');
    secciones.forEach(seccion => {
        seccion.classList.remove('activa');
    });
}

function mostrarSeccion(id) {
    ocultarSecciones();
    const seccion = document.getElementById(id);
    seccion.classList.add('activa');
}

// Botón para Parámetros
document.getElementById('btnParametros').addEventListener('click', function() {
    mostrarSeccion("parametros");
});

// Botón para clientes
document.getElementById('btnClientes').addEventListener('click', function() {
    mostrarSeccion("clientes");
});

// Botón para creditos
document.getElementById('btnCreditos').addEventListener('click', function() {
    mostrarSeccion("seccionCreditos");
});

// Botón para creditos registrados
document.getElementById('btnCreditosRegistrados').addEventListener('click', function() {
    mostrarSeccion("seccionHistorial");
});



function guardarTasa() {
    // 1. Obtener el valor del input
    const inputTasa = document.getElementById('tasaInteres');
    
    // 2. Convertirlo a número
    const tasa = Number(inputTasa.value);
    
    // 3. Validar que esté entre 10 y 20
    const mensaje = document.getElementById('mensajeTasa'); //Viene del Id de <P>
    
    if (tasa >= 10 && tasa <= 20) {
        mensaje.textContent = `Tasa configurada correctamente: ${tasa}%`;
    } else {
        mensaje.textContent = 'La tasa debe estar entre 10% y 20%';
    }
}

// Conectar el botón Guardar tasa
document.getElementById('btnGuardarTasa').addEventListener('click', guardarTasa);

/////////////////////Funciones clientes////////////

function buscarCliente(cedula) {
    // Retorna cliente si existe, null si no
    const cliente = clientes.find(c => c.cedula === cedula);
    return cliente || null;
}

function seleccionarCliente(cedula) {
    // 1. Buscar el cliente
    const cliente = buscarCliente(cedula);
    
    if (cliente) {
        // 2. Guardarlo en clienteSeleccionado
        clienteSeleccionado = cliente;
        
        // 3. Mostrar datos en inputs
        document.getElementById('cedula').value = cliente.cedula;
        document.getElementById('nombre').value = cliente.nombre;
        document.getElementById('apellido').value = cliente.apellido;
        document.getElementById('ingresos').value = cliente.ingresos;
        document.getElementById('egresos').value = cliente.egresos;
        
        // Deshabilitar campo cédula mientras se edita
        document.getElementById('cedula').disabled = true;
    }
}

function guardarCliente() {
    // Obtener datos del formulario
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const ingresos = Number(document.getElementById('ingresos').value);
    const egresos = Number(document.getElementById('egresos').value);
    
    // Buscar si el cliente ya existe
    const clienteExistente = buscarCliente(cedula);
    
    if (clienteExistente) {
        // ACTUALIZAR: modificar datos excepto cédula
        clienteExistente.nombre = nombre;
        clienteExistente.apellido = apellido;
        clienteExistente.ingresos = ingresos;
        clienteExistente.egresos = egresos;
    } else {
        // CREAR nuevo cliente
        const nuevoCliente = {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ingresos: ingresos,
            egresos: egresos
        };
        clientes.push(nuevoCliente);
    }
    
    // Limpiar formulario
    limpiarFormulario();
    
    // Actualizar tabla
    pintarClientes();
}

function limpiarFormulario() {
    // Vaciar todos los inputs
    document.getElementById('cedula').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('ingresos').value = '';
    document.getElementById('egresos').value = '';
    
    // Habilitar campo cédula
    document.getElementById('cedula').disabled = false;
    
    // Limpiar cliente seleccionado
    clienteSeleccionado = null;
}

function pintarClientes() {
    const tbody = document.getElementById('tablaClientes');
    tbody.innerHTML = '';
    
    // Recorrer el arreglo
    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        
        // Usar combinación de comillas para strings anidados
        fila.innerHTML = `
            <td>${cliente.cedula}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.ingresos}</td>
            <td>${cliente.egresos}</td>
            <td>
                <button onclick="seleccionarCliente('${cliente.cedula}')">Actualizar</button>
                <button onclick="eliminarCliente('${cliente.cedula}')">Eliminar</button>
            </td>
        `;
        
        tbody.appendChild(fila);
    });
}

// Conectar botón Guardar cliente
document.getElementById('btnGuardarCliente').addEventListener('click', guardarCliente);


// Función calcularDisponible
function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    if (disponible < 0) {
        return 0;
    }
    return disponible;
}

// Función calcularCapacidadPago
function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.5;
}

// Función calcularInteresSimple
function calcularInteresSimple(monto, tasa, plazoAnios) {
    // plazoAnios * monto * (tasa / 100)
    return plazoAnios * monto * (tasa / 100);
}

// Función calcularTotalPagar
function calcularTotalPagar(monto, interes) {
    // monto + interés + USD 100 (impuestos SOLCA)
    return monto + interes + 100;
}

// Función calcularCuotaMensual
function calcularCuotaMensual(total, plazoAnios) {
    let numeroMeses = plazoAnios * 12;
    return total / numeroMeses;
}

// Función aprobarCredito
function aprobarCredito(capacidadPago, cuotaMensual) {
    if (capacidadPago > cuotaMensual) {
        return true;
    } else {
        return false;
    }
}

// ==================== PARTE 2: CRÉDITOS ====================

// Variable para guardar el cliente actual
let clienteActual = null;

// Parte 2: Buscar cliente
function buscarClienteCredito() {
    // 1. Tomar valor de cédula
    let cedula = document.getElementById('txtCedula').value;
    
    // 2. Buscar cliente
    let cliente = buscarCliente(cedula);
    
    // 3 y 4. Mostrar datos o mensaje
    if (cliente) {
        clienteActual = cliente;
        mostrarDatosCliente(cliente);
    } else {
        clienteActual = null;
        document.getElementById('datosClienteCredito').innerHTML = '<p style="color:red;">Cliente no encontrado</p>';
        document.getElementById('resultadoCredito').innerHTML = '';
    }
}

// Parte 3: Mostrar datos del cliente
function mostrarDatosCliente(cliente) {
    let html = `
        <h3>Datos del Cliente</h3>
        <p><strong>Cédula:</strong> ${cliente.cedula}</p>
        <p><strong>Nombre:</strong> ${cliente.nombre}</p>
        <p><strong>Apellido:</strong> ${cliente.apellido}</p>
        <p><strong>Ingresos:</strong> $${cliente.ingresos}</p>
        <p><strong>Egresos:</strong> $${cliente.egresos}</p>
    `;
    document.getElementById('datosClienteCredito').innerHTML = html;
}

// Parte 4 y 5: Calcular crédito del cliente
function calcularCreditoCliente() {
    if (!clienteActual) {
        alert('Primero busque un cliente');
        return;
    }
    
    // Obtener valores
    let monto = parseFloat(document.getElementById('txtMontoCredito').value);
    let plazoAnios = parseFloat(document.getElementById('txtPlazoCredito').value);
    let tasaInteres1 = tasaInteres; // Tasa para este taller
    
    // Usar funciones existentes
    let disponible = calcularDisponible(clienteActual.ingresos, clienteActual.egresos);
    let capacidadPago = calcularCapacidadPago(disponible);
    let interes = calcularInteresSimple(monto, tasaInteres, plazoAnios);
    let totalPagar = calcularTotalPagar(monto, interes);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
    let aprobado = aprobarCredito(capacidadPago, cuotaMensual);
    
    // Parte 5: Mostrar resultado
    mostrarResultadoCredito(capacidadPago, totalPagar, cuotaMensual, aprobado);
}

// Parte 5 y 6: Mostrar resultado con estilos
function mostrarResultadoCredito(capacidadPago, totalPagar, cuotaMensual, aprobado) {
    let resultadoDiv = document.getElementById('resultadoCredito');
    let estado = aprobado ? "APROBADO" : "RECHAZADO";
    
    resultadoDiv.innerHTML = `
        Capacidad de pago: $${capacidadPago.toFixed(2)}<br>
        Total a pagar: $${totalPagar.toFixed(2)}<br>
        Cuota mensual: $${cuotaMensual.toFixed(2)}<br>
        RESULTADO: ${estado}
    `;
    
    // Parte 6: Aplicar clase según resultado
    resultadoDiv.className = aprobado ? "aprobado" : "rechazado";

    if (aprobado) {
        btnAsignarCredito.disabled = false;
    } else {
        btnAsignarCredito.disabled = true;
    }
}

// Función para limpiar todo el módulo de créditos
function limpiarCreditos() {
    // Limpiar campo de cédula
    document.getElementById('txtCedula').value = '';
    
    // Limpiar campos de solicitud
    document.getElementById('txtMontoCredito').value = '';
    document.getElementById('txtPlazoCredito').value = '';
    
    // Limpiar resultados
    document.getElementById('datosClienteCredito').innerHTML = '';
    document.getElementById('resultadoCredito').innerHTML = '';
    document.getElementById('resultadoCredito').className = '';
    document.getElementById('btnAsignarCredito').disabled = true;
    
    // Limpiar cliente actual
    clienteActual = null;
}

// Función para asignar crédito
function asignarCredito() {
    if (!clienteActual) {
        alert('No hay un cliente seleccionado');
        return;
    }
    
    // Obtener los valores del crédito calculado
    let monto = parseFloat(document.getElementById('txtMontoCredito').value);
    let plazo = parseFloat(document.getElementById('txtPlazoCredito').value);
    let tasa = tasaInteres; 
    let cuota = parseFloat(document.getElementById('spnCuotaMensual')?.innerText.replace('$', '') || 0);
    
    // Si no hay cuota desde el simulador, calcularla
    if (cuota === 0) {
        let disponible = calcularDisponible(clienteActual.ingresos, clienteActual.egresos);
        let capacidadPago = calcularCapacidadPago(disponible);
        let interes = calcularInteresSimple(monto, tasa, plazo);
        let totalPagar = calcularTotalPagar(monto, interes);
        cuota = calcularCuotaMensual(totalPagar, plazo);
    }
    
    // Crear objeto crédito
    let credito = {
        cedula: clienteActual.cedula,
        nombre: clienteActual.nombre,
        apellido: clienteActual.apellido,
        monto: monto,
        tasa: tasa,
        plazo: plazo,
        cuota: cuota
    };
    
    // Agregar al arreglo
    creditos.push(credito);
    
    // Mostrar mensaje de éxito
    alert(`✅ Crédito asignado exitosamente a ${clienteActual.nombre} ${clienteActual.apellido}\nMonto: $${monto}\nPlazo: ${plazo} años\nCuota: $${cuota.toFixed(2)}`);
    
    // Deshabilitar botón después de asignar
    document.getElementById('btnAsignarCredito').disabled = true;

    // Limpiar campos de solicitud después de asignar
    document.getElementById('txtMontoCredito').value = '';
    document.getElementById('txtPlazoCredito').value = '';
    
    console.log('Créditos asignados:', creditos);

    limpiarCreditos();
    pintarCreditos(creditos); //Cada que guarda un credito se visualiza dinamicamente
}

// ==================== FUNCIONES PARA TABLA DE CRÉDITOS ====================

// Función para pintar todos los créditos en la tabla
function pintarCreditos(listaCreditos) {
    const tbody = document.getElementById('cuerpoTablaCreditos');
    
    if (!listaCreditos || listaCreditos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">📭 No hay créditos registrados</td></tr>';
        return;
    }
    
    let html = '';
    for (let i = 0; i < listaCreditos.length; i++) {
        const c = listaCreditos[i];
        html += `
            <tr>
                <td>${c.cedula}</td>
                <td>${c.nombre}</td>
                <td>${c.apellido}</td>
                <td>$${c.monto.toFixed(2)}</td>
                <td>${c.tasa}%</td>
                <td>${c.plazo} años (${c.plazo * 12} meses)</td>
                <td>$${c.cuota.toFixed(2)}</td>
                <td><button class="btn-eliminar" onclick="eliminarCredito(${i})">🗑️ Eliminar</button></td>
            </tr>
        `;
    }
    tbody.innerHTML = html;
}

// Función para buscar créditos por cédula
function buscarCreditosCliente() {
    const cedulapintarCreditos = document.getElementById('buscarCedulaListado').value.trim();
    
    if (cedulapintarCreditos === '') {
        alert('⚠️ Ingrese una cédula para buscar');
        return;
    }
    
    const resultados = creditos.filter(credito => credito.cedula === cedulapintarCreditos);
    
    if (resultados.length === 0) {
        const tbody = document.getElementById('cuerpoTablaCreditos');
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center;">❌ No se encontraron créditos para la cédula: ${cedulapintarCreditos}</td></tr>`;
    } else {
        pintarCreditos(resultados);
    }
}

// Función para eliminar un crédito por índice
function eliminarCredito(indice) {
    if (confirm(`¿Está seguro de eliminar el crédito de ${creditos[indice].nombre} ${creditos[indice].apellido}?`)) {
        creditos.splice(indice, 1);
        pintarCreditos(creditos);
        alert('✅ Crédito eliminado correctamente');
        
        // Si el historial está visible, actualizar
        const seccionHistorial = document.getElementById('seccionHistorial');
        if (seccionHistorial.style.display === 'block') {
            mostrarHistorialCreditos();
        }
    }
}

// Función actualizada para mostrar historial (usa la tabla)
function mostrarHistorialCreditos() {
    pintarCreditos(creditos);
}

// Función actualizada para limpiar historial
function limpiarHistorial() {
    if (confirm('¿Está seguro de eliminar TODOS los créditos registrados? Esta acción no se puede deshacer.')) {
        creditos = [];
        pintarCreditos(creditos);
        alert('✅ Historial limpiado correctamente');
    }
}

