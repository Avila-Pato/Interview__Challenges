export default function letrasPorNumeros(string: string){
  const letra = string.toLowerCase().charCodeAt(0)
  
  // El código para 'a' es 97, por lo que restamos 96 para obtener 1
  return letra - 96
}