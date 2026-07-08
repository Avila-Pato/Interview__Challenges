export default function tieneDuplicados(array: string[]): boolean {

    //   return new Set(array).size !== array.length;

    
    const vistos = new Set<string>()

    for (let i = 0; i < array.length; i++) {
        if(vistos.has(array[i])) {
            return true // duplciado encontrado
        }
        vistos.add(array[i])
    }
    return false
}