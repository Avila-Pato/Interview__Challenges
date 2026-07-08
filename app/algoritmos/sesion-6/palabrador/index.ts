export default function palabrador(palabras: string[]) {
//Verificar si el array esta vacio
    if(palabras.length === 0) {
        return "No se puede formar la palabra";
    }
    // guardamos la primera palabra
    // supongamos ["hola", "largo", "gordo"] -> "hola"
    let resultado = palabras[0];
    //recorremos el resto de las palabras -> ["largo", "gordo"]
    for (let i = 1; i < palabras.length; i++) {
        // guardamos la palabra actual -> "largo"
        const palabra = palabras[i];
        // variable para verificar si se encontro una coincidencia
        let encontrado = false;
        // calcular la longitud maxima de coincidencia entre el resultado y la palabra actual
        // por ejemplo, si resultado siempre traera el minimo
        // "hola", "largo"
        // max = 4
        const max = Math.min(resultado.length, palabra.length)

        //buscar coincidencias mas larga si max vale 4, entonces j = 4, 3, 2, 1
        for (let j = max; j > 0; j--) {
            // verificar si la subcadena final de resultado coincide con la subcadena inicial de palabra
            // tomando con el metodo slice el final de resultado y el inicio de palabra
           
            // comparacion 

            // resultado
            // j = 4
            // j = 3
            // j = 2
            // j = 1
            // palabra
            // j = 4
            // j = 3
            // j = 2
            // j = 1

            if(resultado.slice(-j) === palabra.slice(0, j)) {
          // si hay coincidencia, agregamos la parte restante de la palabra al resultado
                resultado += palabra.slice(j);
                encontrado = true;
                break;
            } 
        }

        if(!encontrado) {
            return "No se puede formar la palabra";
        }
    }

    return resultado;
}

console.log(palabrador(["hola", "largo", "gordo"])); // Output: "holargo"
console.log(palabrador(["hola", "largo", "perro"])); // Output: "No se puede formar la palabra"