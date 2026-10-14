// Crear un programa que genere un número aleatorio del 1 al 10 y utilice un ciclo while para pedir al usuario que lo adivine hasta que acierte.


const prompt = require("prompt-sync")();

// Generamos un número aleatorio del 1 al 10
let secreto = Math.floor(Math.random() * 10) + 1;

// Variable para guardar el número del usuario
let numero = 0;

// Repetimos mientras no adivine el número
while (numero !== secreto) {

    // Pedimos al usuario que ingrese un número
    numero = Number(prompt("Adivina un número del 1 al 10: "));

    // Verificamos si adivinó
    if (numero === secreto) {
        console.log("¡Felicidades! Adivinaste el número.");
    } else {
        console.log("Incorrecto, intenta otra vez.");
    }
}
