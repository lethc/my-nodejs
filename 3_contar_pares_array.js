// Crear una función que reciba un array de números, cuente cuántos son pares y devuelva el total.

function contarPares(numeros) {
    // Declaramos y Asignamos variable para contar los números pares
    let contador = 0;

    // Recorremos todos los números del array
    for (let numero of numeros) {
        
        // Verificamos si el número es par
        if (numero % 2 === 0) {
            contador ++;
        }
    }

    // Devolvemos la cantidad de números pares
    return contador;

}

// Creamos un array de números
let numeros = [10,15,20,7,8,13,4]

// Mostrar el Resultado
console.log("Cantidad de números pares:", contarPares(numeros))