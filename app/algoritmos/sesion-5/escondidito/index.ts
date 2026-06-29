export default function encontraditto(pokemon: string[]): number {
 
  for (let i = 0; i < pokemon.length; i++) {
    if(pokemon[i - 1] === pokemon[i + 1]){
      return i // Se encontro el pokemon
    }
  }

  return -1 // No se encontro el pokemon
}