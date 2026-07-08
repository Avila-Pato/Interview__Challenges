export default function quejaJusta(frase: string) {
  const  contador: Record<string, number> = {}

  for(const letra of frase) {
    // incremento del cotnador de letras
     contador[letra] = (contador[letra] || 0) + 1
    }
    // obtengo los valores del contador y los guardo en una variable
     const cantidades = Object.values(contador)

     // verifico si todos los valores del contador son iguales a 1
     // every regresa true si todos los elementos del arreglo cumplen con la condición, de lo contrario regresa false
    return cantidades.every(cantidades => cantidades === 1)
}

console.log(quejaJusta("hola")); // Output: true
console.log(quejaJusta("hola hola")); // Output: false