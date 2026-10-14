// Crear una función que utilice un ciclo for para generar e imprimir los primeros 10 números de la secuencia de Fibonacci.


function fibonacci() {

    // Creamos los dos primeros números de Fibonacci
    let a = 0;
    let b = 1;

    // Repetimos el proceso 10 veces
    for (let i = 0; i < 10; i++) {

        // Mostramos el número actual
        console.log(a);

        // Calculamos el siguiente número
        let siguiente = a + b;

        // Actualizamos los valores
        a = b;
        b = siguiente;
    }
}

// Llamamos a la función
fibonacci();
