import { data } from "./data";

export type Registry = {
  firstName: string;
  lastName: string;
  country: string;
  continent: string;
  age: number;
  language: string;
};

function continentesRepresentados(array: Registry[]): boolean {
  const continentes = new Set(
    array.map(item => item.continent)
  );

  console.log(continentes);

  return continentes.size === 5;
}

console.log(continentesRepresentados(data));