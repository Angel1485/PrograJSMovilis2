
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



