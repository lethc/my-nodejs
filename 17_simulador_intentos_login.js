// Crear un programa que simule un inicio de sesión y permita al usuario ingresar una contraseña con un máximo de 3 intentos, utilizando un ciclo while.


const prompt = require("prompt-sync")();

// Definimos la contraseña correcta
let contraseña = "1234";

// Creamos un contador de intentos
let intentos = 0;

// Repetimos mientras tenga menos de 3 intentos
while (intentos < 3) {

    // Pedimos la contraseña al usuario
    let ingreso = prompt("Ingresa tu contraseña: ");

    // Aumentamos el contador
    intentos++;

    // Verificamos si la contraseña es correcta
    if (ingreso === contraseña) {
        console.log("¡Acceso permitido!");
        break;
    } else {
        console.log("Contraseña incorrecta.");
    }
}

// Verificamos si se agotaron los intentos
if (intentos === 3) {
    console.log("Has utilizado tus 3 intentos.");
}
