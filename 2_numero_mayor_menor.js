// Crear una función que reciba un array de números y devuelva el número mayor y el menor.

// Creación de la funcion
function mayorYMenor(numeros) {

    // Tomamos el primer número como mayor y menor
    let mayor = numeros[0];
    let menor = numeros[0];

    // Recorremos todos los números del array
    for (let numero of numeros) {
        
        // Si encontramos un número más grande
        if (numero > mayor) {
            mayor = numero;
        }

        // Si encontramos un número más pequeño
        if (numero < menor) {
            menor = numero;
        }
    }

    // Devovemos el número mayor y menor
    return { mayor, menor };
}

// Creamos un array de números
let numeros = [10,20,30,40,50];

// LLamamos a la función

let resultado = mayorYMenor(numeros);

// Mostramos los resultados
console.log("Número mayor: ", resultado.mayor);
console.log("Número menor: ", resultado.menor);