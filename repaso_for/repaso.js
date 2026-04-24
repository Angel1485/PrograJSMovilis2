function mostrar(opcion) {

    switch(opcion) {
        case 1:
            ejercicio1();
            break;

        case 2:
            imprimirCentenas();
            break;

        case 3:
            imprimirCentenasRegresivo();
            break;

        case 4:
            mostrarMensaje1();
            break;

        case 5:
            mostrarMensaje2();
            break;
        case 6:
            mostrarMensaje3();
            break;
        case 7:
            mostrarMensaje4();
            break;
        case 8:
            imprimirTabla3();
            break;

        default:
            console.log("Opción no válida");
    }

}

function ejercicio1() {
    for(let i = 1; i <= 5; i++) {
        console.log(i);
    }
}

function imprimirCentenas() {
    for(let i = 100; i <= 1000; i += 100) {
        console.log(i);
    }
}

function imprimirCentenasRegresivo() {
    for(let i = 1000; i >= 800; i -= 100) {
        console.log(i);
    }
}

function mostrarMensaje1() {
    console.log("Mensaje 1");
    for (let i = 5; i < 8; i++) {
        console.log(i);
    }
}

function mostrarMensaje2() {
    console.log("Mensaje 2");
    for (let i = 10; i >= 8; i--) {
        console.log(i);
    }
}

function mostrarMensaje3() {
    console.log("Mensaje 3");
    for (let i = 0; i < 3; i++) {
        console.log(i);
    }
}

function mostrarMensaje4() {
    console.log("Mensaje 4");
    for (let i = 8; i > 5; i--) {
        console.log(i);
    }
}

function imprimirTabla3() {
    for (let i = 1; i <= 10; i++) {
        console.log("3 x " + i + " = " + (3*i));
    }
}