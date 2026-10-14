// Crear un programa que pida al usuario un número y muestre su tabla de multiplicar del 1 al 10 utilizando un ciclo for.


const readline = require("readline");

// Configuramos la entrada de datos desde la terminal

console.log("Ingresa un número para la Tabla: ")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Pedimos un número al usuario
rl.question("Ingresa un número: ", function(numero) {

    // Convertimos el dato ingresado a número
    numero = Number(numero);

    // Recorremos los números del 1 al 10
    for (let i = 1; i <= 10; i++) {

        // Multiplicamos el número por i
        console.log(numero + " x " + i + " = " + (numero * i));
    }

    // Cerramos la entrada de datos
    rl.close();
});
