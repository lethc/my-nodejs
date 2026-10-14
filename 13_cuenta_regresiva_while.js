// Crear un programa que pida al usuario un número y realice una cuenta regresiva desde ese número hasta llegar a 0, utilizando un ciclo while.



const readline = require("readline");

// Configuramos la entrada de datos
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Pedimos un número al usuario
rl.question("Ingresa un número: ", function(numero) {

    // Convertimos el texto a número
    numero = Number(numero);

    // Repetimos hasta llegar a 0
    while (numero >= 0) {

        // Mostramos el número actual
        console.log(numero);

        // Restamos 1 al número
        numero--;
    }

    // Cerramos la entrada de datos
    rl.close();
});
