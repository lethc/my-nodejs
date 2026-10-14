// Crear una función que reciba un array de números, busque un número específico y devuelva su posición dentro del array.


function buscarNumero(numeros, buscado) {

    // Recorremos todos los números del array
    for (let i = 0; i < numeros.length; i++) {

        // Verificamos si encontramos el número buscado
        if (numeros[i] === buscado) {

            // Devolvemos su posición
            return i;
        }
    }

    // Si no encontramos el número, devolvemos -1
    return -1;
}

// Creamos un array de números
let numeros = [10, 20, 30, 40, 50];

// Número que queremos buscar
let buscado = 30;

// Mostramos el resultado
console.log("Posición:", buscarNumero(numeros, buscado));
