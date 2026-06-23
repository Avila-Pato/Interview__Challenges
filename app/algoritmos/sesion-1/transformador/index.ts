type Input = {
  nombres: string[];
  edades: number[];
};

type Output = {
  id: number;
  nombre: string;
  edad: number;
};

export default function transformador(input: Input): Output[] {
  return input.nombres.map((nombre, index) => ({
    id: index + 1,
    nombre,
    edad: input.edades[index]
  }))
  
}

transformador({
  nombres: ["Bruno", "Andrea"],
  edades: [20, 19],
});

// [
//   { id: 1, nombre: "Bruno", edad: 20 },
//   { id: 2, nombre: "Andrea", edad: 19 },
// ]