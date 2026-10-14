// Crear una función que invierta el orden de los elementos de un array sin utilizar .reverse().


function invertirArray(numeros) {

    // Creamos un array vacío para guardar los números invertidos
    let invertido = [];

    // Recorremos el array desde el último número hasta el primero
    for (let i = numeros.length - 1; i >= 0; i--) {

        // Agregamos cada número al nuevo array
        invertido.push(numeros[i]);
    }

    // Devolvemos el array invertido
    return invertido;
}

// Creamos un array de números
let numeros = [10, 20, 30, 40, 50];

// Mostramos el resultado
console.log("Array invertido:", invertirArray(numeros));
