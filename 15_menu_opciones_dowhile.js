// Crear un programa que muestre un menú con diferentes opciones y utilice un ciclo do while para repetirlo hasta que el usuario seleccione la opción de salir


// Importamos readline
const readline = require("readline/promises");

// Configuramos la entrada de datos
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function mostrarMenu() {

    let opcion;

    do {
        // Mostramos el menú
        console.log("\n--- MENÚ PRINCIPAL ---");
        console.log("1. Saludar");
        console.log("2. Mostrar mensaje");
        console.log("3. Salir");

        // Pedimos una opción al usuario
        opcion = Number(await rl.question("Elige una opción: "));

        // Verificamos la opción seleccionada
        if (opcion === 1) {
            console.log("¡Hola, bienvenido!");
        } else if (opcion === 2) {
            console.log("¡Estás aprendiendo Node.js!");
        } else if (opcion === 3) {
            console.log("Saliendo del programa...");
        } else {
            console.log("Opción inválida.");
        }

    } while (opcion !== 3);

    // Cerramos la entrada de datos
    rl.close();
}

// Ejecutamos la función
mostrarMenu();
