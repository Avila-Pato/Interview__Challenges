export default function numerosPerdidos(numeros: number[]): number[] {
  const faltantes = []
  const max = Math.max(...numeros)

  for (let i = 1; i <= max; i++) {
    if (!numeros.includes(i)) {
      faltantes.push(i)
    }
  }
  return faltantes
}

const numeros = [1, 2, 4, 6, 7, 9]
console.log(numerosPerdidos(numeros)) // [3, 5, 8]