export default function contarDuplicados(texto: string){
    const contador: Record<string, number> = {};

    for (const num of texto) {
        contador[num] = (contador[num] || 0) + 1
    }

    return contador

}

console.log(contarDuplicados('111234'));
// { '1': 3, '2': 1, '3': 1 }