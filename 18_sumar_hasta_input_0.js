// Crear un programa que pida números al usuario y los vaya sumando utilizando un ciclo while. El programa terminará cuando el usuario ingrese 0.


const prompt = require("prompt-sync")();

// Variable para guardar la suma
let suma = 0;

// Variable para guardar el número ingresado
let numero = 1;

// Repetimos mientras el número sea diferente de 0
while (numero !== 0) {

    // Pedimos un número al usuario
    numero = Number(prompt("Ingresa un número (0 para salir): "));

    // Sumamos el número ingresado
    suma += numero;
}

// Mostramos la suma total
console.log("La suma total es:", suma);
