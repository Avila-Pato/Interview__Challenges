export default function girar(texto: string): string {
  return texto
            .split("")
            .map(word => 
                word.length >= 5
                ? word.split("").reverse().join("")
                : word
            )
            .join(" ");
}

// split(" ") → separa palabras
// map() → procesa cada palabra
// si length >= 5 → la invierte
// join(" ") → reconstruye la frase