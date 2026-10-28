// Crear un programa que pida al usuario un número mayor que 0. Si ingresa un número inválido, el programa volverá a pedirlo hasta que sea correcto.


const readline = require("readline");

// Configuramos la entrada de datos
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Creamos una función para pedir un número
function pedirNumero() {

    rl.question("Ingresa un número mayor que 0: ", function(respuesta) {

        // Convertimos la respuesta en un número
        let numero = Number(respuesta);

        // Validamos si el número es correcto
        do {
            if (respuesta.trim() === "" || !Number.isFinite(numero) || numero <= 0) {
                console.log("Número inválido. Intenta otra vez.");
                pedirNumero();
                return;
            }
        } while (numero <= 0);

        // Mostramos el resultado
        console.log("Número válido:", numero);

        // Cerramos la entrada de datos
        rl.close();
    });
}

// Llamamos a la función
pedirNumero();
