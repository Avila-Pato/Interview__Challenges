export default function encontrarImpar(numeros: number[]): number {
  let resultado = 0;

  for (const num of numeros) {
        resultado ^= num
  }
  return resultado
}

// XOR (^): 
// todos los números que aparecen un número
//  par de veces se cancelan entre sí, 
// quedando solamente el que aparece una cantidad impar de veces.