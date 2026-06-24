export default function moverCeros(array: unknown[]): unknown[] {
    const numeros = array.filter((num) => num !== 0);
    const ceros = array.filter((num) => num === 0);

    return [...numeros, ...ceros];
}

console.log(moverCeros([false, 1, 0, 1, 2, 0, 1, 3, "a"])); 
// [false,1,1,2,1,3,"a",0,0]