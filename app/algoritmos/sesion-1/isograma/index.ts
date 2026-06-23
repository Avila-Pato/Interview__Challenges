export default function esIsograma(string: string): boolean {
  if(string === '') return true;
  
  return [...new Set(string.toLowerCase())].length === string.length
  //string.toLowerCase() - convierte todo a minusculas
  //new set elimina los duplicados
  //[...set] - convierte set en un arreglo ['a','b']
  //.length cuenta cuantos elementos hay

}