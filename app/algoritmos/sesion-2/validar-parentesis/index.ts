export default function validarParéntesis(parentesis: string): boolean {
    let contador = 0;

    for (let i = 0; i < parentesis.length; i++) {
        if(parentesis[i] === '(') {
            contador++
        }else if (parentesis[i] === ')') {
            contador--
        }

        if(contador < 0) {
            return false
        }
    }

    return contador === 0
}