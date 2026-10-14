function busquelineal(arr, elemento) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elemento) {
            return i
        }
    }
    return -1
}

const arreglo=[10,5,3,8,2,6];
const elementobuscado=5;
const indice=busquelineal(arreglo,elementobuscado);
console.log(`El elemento ${elementobuscado} se encuentra en el indice ${indice}`) // si queremos concatenar variables con texto ``(comillas invertidas)

