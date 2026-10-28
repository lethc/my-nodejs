// Crear un programa que utilice un ciclo while para generar los números de Fibonacci hasta encontrar uno que supere 100.


function fibonacci() {

    // Creamos los dos primeros números
    let a = 0;
    let b = 1;

    // Repetimos mientras el número no supere 100
    while (a <= 100) {

        // Mostramos el número actual
        console.log(a);

        // Calculamos el siguiente número
        let siguiente = a + b;

        // Actualizamos los valores
        a = b;
        b = siguiente;
    }
}

// Ejecutamos la función
fibonacci();
