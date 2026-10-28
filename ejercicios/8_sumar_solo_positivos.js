// Crear una función que reciba un array de números, elimine los negativos y sume únicamente los positivos.


function sumarPositivos(numeros) {

    // Filtramos los números positivos
    let positivos = numeros.filter(numero => numero > 0);

    // Sumamos los números positivos
    let suma = positivos.reduce((total, numero) => total + numero, 0);

    // Devolvemos la suma total
    return suma;
}

// Creamos un array con números positivos y negativos
let numeros = [10, -5, 20, -3, 15, -8, 5];

// Mostramos el resultado
console.log("Suma de positivos:", sumarPositivos(numeros));
