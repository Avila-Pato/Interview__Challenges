export default function urinalesLibres(estado: string): number {
 const urinales = estado.split('')

 // Validar estado inicial si hay dos 1 seguidos
 // retornar -1
 for (let i = 0; i < urinales.length; i++) {
  if(urinales[i] === "1" && urinales[i + 1] === "1") {
    return -1
  }
 }

 let contador = 0

 for (let i = 0; i < urinales.length; i++) {
    const izquierda = i === 0 ? "0" : urinales[i - 1]
    const derecha =
      i === urinales.length - 1 ? "0" : urinales[i + 1]

      if(
        urinales[i] === "1" && 
        derecha === "0" && 
        izquierda === "0"
      ) {
        urinales[i] = "0"
        contador++
      }
 }
 return contador
}