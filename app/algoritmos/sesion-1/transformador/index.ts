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