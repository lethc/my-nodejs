// Crear una función que reciba un array de nombres y convierta todos sus elementos a mayúsculas utilizando .map().


function convertirMayusculas(nombres) {

    // Recorremos cada nombre y lo convertimos a mayúsculas usando una función tradicional
    let mayusculas = nombres.map(function(nombre) { // map transforma los elementos de un arreglo
        return nombre.toUpperCase();
    });

    // Devolvemos el array con los nombres en mayúsculas
    return mayusculas;
}

// Creamos un array de nombres
let nombres = ["Ana", "Luis", "Pedro", "Maria", "Carlos"];

// Mostramos el resultado
console.log("Nombres en mayúsculas:", convertirMayusculas(nombres));
