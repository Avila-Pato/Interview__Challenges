import { Developer } from "./type";


export default function contarLosLenguajes(developers: Developer[]){
    // const contadores = developers.reduce<Record<string, number>>((acc, dev) => {
    //     acc[dev.language] = (acc[dev.language] || 0) + 1
    //     return acc
    // }, {})

    const contadores: Record<string, number> = {}
    for (const dev of developers) {
        contadores[dev.language] = (contadores[dev.language] || 0 ) + 1        
    }

    return contadores

   

}