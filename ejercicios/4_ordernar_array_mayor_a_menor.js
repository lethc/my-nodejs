// Crear una función que ordene los números de un array de menor a mayor sin utilizar .sort().
// Se utilizó el algoritmo ordenamiento burbuja (Bubble Sort)

function ordenarArray(numeros) {

    // Recorremos el array varias veces
    for (let i = 0; i < numeros.length; i++) {

        // Comparamos los números vecinos
        for (let j = 0; j < numeros.length - 1; j++) {

            // Si el primero es mayor, los intercambiamos
            if (numeros[j] > numeros[j + 1]) { // ¿El número de la izquierda es más grande que el de la derecha? ¿Es 5 más grande que 2?

                let temporal = numeros[j]; // Respalda el valor de 5
                numeros[j] = numeros[j + 1]; // Coloca 2 donde estaba 5
                numeros[j + 1] = temporal; // Coloca 5 donde estaba 2
            }
        }
    }

    return numeros;
}

// Creamos un array desordenado
let numeros = [5,2,8,1,4]

// Mostramos el resultado
console.log("Array ordenado:", ordenarArray(numeros));
