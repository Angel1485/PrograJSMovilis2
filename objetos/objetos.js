probarAtributos = function(){
    let persona = {
        nombre: "Belkix",
        apellido: "Requejo",
        edad: 24,
        estavivo: true
    }
    console.log(persona.nombre);
    console.log(persona.apellido);
    console.log(persona.edad);
    if(persona.estavivo == false){
        console.log("No esta vivo");
    }else{
        console.log("Esta Vivo");
    }
}

modificarAtributos = function(){
    let cuenta = {
        numeros: "5369874513",
        saldos: 0.0
    }
    console.log(cuenta.numeros);
    console.log(cuenta.saldos);
    cuenta.saldos = 100;
    console.log(cuenta.saldos);
    cuenta.saldos += 10;
    console.log(cuenta.saldos);
}

crearCliente = function() {
    let cliente = {
        cedula: "4569871236",
        nombre: "Pepito"
    }
    cliente.nombre = "Juan";
    console.log(cliente.nombre);
    console.log(cliente.cedula);

    let cliente1 = {}
    cliente1.cedula = "1569871236-6";
    cliente1.nombre = "Juan Jose";
    cliente1.apellido = "Salcedo";
    console.log(cliente1.nombre);
    console.log(cliente1.cedula);

}

probarIncrementarSaldo = function(){
    let cuenta = {
        numero: "459876352",
        saldos: 34.0
    }
    incrementarSaldo(cuenta,100);
    console.log(cuenta.saldos);
}

incrementarSaldo = function(cuenta, monto){
    cuenta.saldos += monto;
}

probarDeterminarMayor = function(){
    let persona1 = {
        nombre: "Justin",
        edad: "20"
    };

    let persona2 = {
        nombre: "Angel",
        edad: "15"
    };

    let mayor = determinarMayor(persona1,persona2);
    if(mayor != null){
        console.log("El Mayor es: " + mayor.nombre);
    }
}

determinarMayor = function(persona1, persona2){
    if(persona1.edad > persona2.edad){
        return persona1;
    } else if(persona2.edad > persona1.edad){
        return persona2;
    } else {
        return null;
    }
}