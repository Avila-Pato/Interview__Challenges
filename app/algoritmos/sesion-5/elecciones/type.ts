interface Registro {
  id: string;
  voto: string;
  nombre: string;
}
// export const desarrolladores: Developer[] = [
// Input
export const unificarVotos: Registro[][] = (
  [
    [{id: "123456", nombre: 'Gaspar', voto: 'Bingo'}, 
      {id: "234123", nombre: 'Clelia', voto: 'Sudoku'}],
    [{id: "123456", nombre: 'Gaspar', voto: 'Bingo'}],
    [{id: "643723", nombre: 'Pedro', voto: 'Sudoku'}]
  ]
)

// Output
// [
//   {id: "123456", nombre: 'Gaspar', voto: 'Bingo'},
//   {id: "234123", nombre: 'Clelia', voto: 'Sudoku'},
//   {id: "643723", nombre: 'Pedro', voto: 'Sudoku'}
// ]