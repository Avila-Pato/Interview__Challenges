interface Registro {
  id: string;
  voto: string;
  nombre: string;
}

export default function unificarVotos(
  mesas: Registro[][],
  parametro: keyof Registro, // solo pasa id, voto o nombre
): Registro[] {

  const vistos = new Set<string>() // set para detectar duplicados
  const  resultados: Registro[] = [] 

// Doble for porque e sun array de arrays pro eso se 
// nececitan 2 for anidados
// 1 para recorrer cada mesa, otro para recorrer cada registro dentro de esa mesa
  for (const mesa of mesas) {
    for (const registro of mesa) {
      const valor =  registro[parametro] 

      if(!vistos.has(valor)) {
        vistos.add(valor)
        resultados.push(registro)
      }
    }
  }

return resultados

}