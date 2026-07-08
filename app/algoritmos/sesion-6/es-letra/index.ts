export default function esUnaLetra(caracter: string) {
  
    for(let i = 0; i < caracter.length; i++) {
        if(caracter[i].toLowerCase() >= 'a' && caracter[i].toLocaleLowerCase() <= 'z') {
            return true
        }else {
            return false
        }
    }
}