let clientes = [
    {cedula: "4879653125", nombre: "Juan", edad: 20},
    {cedula: "8974569317", nombre: "Mario", edad: 50},
    {cedula: "7896453154", nombre: "Pepe", edad: 22}
];

agregarCliente = function(cliente){
    let resultado;
    resultado = buscarCliente(cliente.cedula);
    if(resultado == null){
        clientes.push(cliente);
        alert("Cliente Agregado")
        mostrarClientes();
    }else{
        alert("Ya existe el cliente con la cedula: " + cliente.cedula)
    }
}

crearCliente = function () {
    let valorCedula = recuperaraTexto("txtCedula");
    let valorNombre = recuperaraTexto("txtNombre");
    let valorEdad = recuperarInt("txtEdad");
    let nuevoCliente = {};
    nuevoCliente.cedula = valorCedula;
    nuevoCliente.nombre = valorNombre;
    nuevoCliente.edad = valorEdad;
    agregarCliente(nuevoCliente);
}

guardarCambios = function () {
    let valorCedula = recuperaraTexto("txtCedula");
    let valorNombre = recuperaraTexto("txtNombre");
    let valorEdad = recuperarInt("txtEdad");
    let datoCliente = {};
    datoCliente.cedula = valorCedula;
    datoCliente.nombre = valorNombre;
    datoCliente.edad = valorEdad;
    modificarCliente(datoCliente);
    // mostrar en la tabla
    mostrarClientes();
}

modificarCliente = function(cliente){
    let clienteEncontrado = buscarCliente(cliente.cedula);
    if(clienteEncontrado != null){
    clienteEncontrado.nombre = cliente.nombre;
    clienteEncontrado.edad = cliente.edad;
    }
}

ejecutarBusqueda = function(){
    let valorCedula = recuperaraTexto("txtCedulaBusqueda");
    let cliente = buscarCliente(valorCedula);

    if(cliente == null){
        alert("Cliente no encontrado")
    }else {
        mostrarTextoEnCaja("txtCedula",cliente.cedula);
        mostrarTextoEnCaja("txtNombre",cliente.nombre);
        mostrarTextoEnCaja("txtEdad",cliente.edad);
    }
}

buscarCliente = function(cedula){
    let elementoCliente;
    let clienteEncontrado = null;
    for(let i=0; i<clientes.length; i++){
        elementoCliente = clientes[i];
        if(elementoCliente.cedula == cedula){
            clienteEncontrado = elementoCliente;
            break
        }
    }
    return clienteEncontrado;
}

mostrarClientes = function() {
    let cmpTabla = document.getElementById("TablaClientes");
    let contenidoTabla = "<table border='1'>";
    contenidoTabla += "<tr> "+
                        "<th>Cédula</th> "+
                        "<th>Nombre</th> " +
                        "<th>Edad</th> "+
                      "</tr>";
    let elementoCliente;
    for(let i = 0; i < clientes.length; i++) {
        elementoCliente = clientes[i];
        contenidoTabla += "<tr>";
        contenidoTabla += "<td>" + elementoCliente.cedula + "</td>";
        contenidoTabla += "<td>" + elementoCliente.nombre + "</td>";
        contenidoTabla += "<td>" + elementoCliente.edad + "</td>";
        contenidoTabla += "</tr>";
    }
    contenidoTabla += "</table>";
    cmpTabla.innerHTML = contenidoTabla;
}