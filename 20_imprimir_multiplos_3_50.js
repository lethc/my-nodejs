// Crear un programa que utilice un ciclo while para mostrar todos los múltiplos de 3 menores que 50.



function mostrarMultiplos() {

    // Comenzamos desde el número 3
    let numero = 3;

    // Repetimos mientras el número sea menor que 50
    while (numero < 50) {

        // Mostramos el múltiplo de 3
        console.log(numero);

        // Sumamos 3 para obtener el siguiente múltiplo
        numero += 3;
    }
}

// Ejecutamos la función
mostrarMultiplos();
