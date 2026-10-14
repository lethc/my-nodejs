// Crear una función que reciba un array de números y devuelva la suma de todos sus elementos.

// Creamos una función que recibe un array.
function sumarArray(numeros) {
    // Creamos una variable para guardar la suma.
    let suma = 0;

    // Recorremos cada número del array
    for (let numero of numeros) {

        // Sumamos cada número a la variable suma.
        suma += numero;
    }

    // Devolvemos el resultado final.
    return suma;
}

let numeros = [10,20,30,40,50];

// Mostramos el resultado en la terminal.
console.log("La suma es: ", sumarArray(numeros))