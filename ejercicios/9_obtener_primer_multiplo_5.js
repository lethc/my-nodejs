// Crear una función que reciba un array de números y encuentre el primer número que sea múltiplo de 5 utilizando .find().


function buscarMultiplo(numeros) {

    // Buscamos el primer número que sea múltiplo de 5
    let multiplo = numeros.find(numero => numero % 5 === 0); // Si el residuo es igual a cero (=== 0), significa que el número es divisible por 5 de forma exacta (es decir, es un múltiplo de 5).

    // Devolvemos el número encontrado
    return multiplo;
}

// Creamos un array de números
let numeros = [3, 7, 12, 15, 20, 25, 8];

// Mostramos el resultado
console.log("Primer múltiplo de 5:", buscarMultiplo(numeros));
