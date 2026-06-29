export default function encontrarLIS(numeros: number[]): number {
  //Dp es la longitud de LIS que termina en la posicion i
  // inicialmente todos valen 1 porque cada numero por si solo ya
  //forma una subsecuencia de longitud 1
  // para cada numero, miramos todos los anteriores
  const dp = new Array(numeros.length).fill(1)

  for (let i = 0; i < numeros.length; i++) {
    for (let j = 0; j < i; j++) {
      if (numeros[j] < numeros[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }

    }

  }

  return Math.max(...dp)
}