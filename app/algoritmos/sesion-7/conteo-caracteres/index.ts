export default function conteoCaracteres(texto: string) {
  const  contador: Record<string, number> = {};

  for(const char of texto) {
    contador[char] = (contador[char] || 0) + 1
  }
  return contador

}