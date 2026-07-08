export default function sonAnagramas(palabra1: string, palabra2: string): boolean {
  return palabra1.split("").sort().join("") === palabra2.split("").sort().join("")
}

// Sort posiciona el valor de Unicode
//  Unicode es un estándar universal que asigna un número único (llamado code point) a cada símbolo o letra,
// ejemplo  let saludo = "Hola \u{1F44B}"; // "Hola 👋"

export const Anagrama = (texto: string) => {
  return texto
  .trim()
  .toLowerCase()
  .normalize("NFD") // Seprala las tildes

}
