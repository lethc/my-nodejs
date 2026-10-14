// Crear un programa que recorra los números del 1 al 50, sume solamente los impares y detenga el proceso cuando la suma supere 500.


function sumarImpares() {

    // Creamos una variable para guardar la suma
    let suma = 0;

    // Variable para controlar el ciclo while
    let continuar = true;

    // Recorremos los números del 1 al 50
    for (let i = 1; i <= 50; i++) {

        // Verificamos si el número es impar
        if (i % 2 !== 0) {

            // Sumamos el número impar
            suma += i;

            // Verificamos si la suma supera 500
            while (suma > 500 && continuar) {
                console.log("La suma superó 500");
                continuar = false;
            }

            // Detenemos el ciclo for
            if (!continuar) {
                break;
            }
        }
    }

    // Mostramos la suma final
    console.log("Suma total:", suma);
}

// Ejecutamos la función
sumarImpares();
