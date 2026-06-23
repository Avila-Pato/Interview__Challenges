
export default function filtrarPares(array: string[]){
    return [...new Set(array)];

}
console.log(filtrarPares(["A","B","A","C","C","C","C"]));



// ["A","B","A","C","C","C","C"] // -> ["A","C"]
// [1,2,3,1,2] // -> [1,2]