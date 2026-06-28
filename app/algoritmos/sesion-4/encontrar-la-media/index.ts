import { Developer } from "./type";




export default function encontrarLaMedia(developers: Developer[]): number {

  const sumaDeEdades = developers.reduce((acc, dev) => acc + dev.age, 0)

  const promedio = sumaDeEdades / developers.length

  return promedio


}