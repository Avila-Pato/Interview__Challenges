




export default function buscarAislado(){
    const  numeros = [2, 4, 0, 100, 4, 11, 2602, 36]

    const impar =  numeros.find((num => num % 2 !== 0))
    const imparFitler = numeros.filter((num => num % 2 !== 0))

}