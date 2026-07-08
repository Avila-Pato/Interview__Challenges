export default function sumaDeRangos(inicio: number, fin: number): number {
  if(inicio > fin) return 0

  let suma = 0;
  for (let i = inicio; i <= fin; i++) {
    suma += i;
  }
  return suma;
}

const resultado = sumaDeRangos(1, 5);
console.log(`La suma de los números del 1 al 5 es: ${resultado}`); // La suma de los números del 1 al 5 es: 15

const resultado2 = sumaDeRangos(5, 1);
console.log(`La suma de los números del 5 al 1 es: ${resultado2}`); // La suma de los números del 5 al 1 es: 0

const resultado3 = sumaDeRangos(3, 7);
console.log(`La suma de los números del 3 al 7 es: ${resultado3}`); // La suma de los números del 3 al 7 es: 25