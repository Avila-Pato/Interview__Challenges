import { Developer } from "./type";

export default function encontrarAlMasViejo(developers: Developer[]): Developer[] {
//   return developers.filter((dev) => dev.age >= 49 )

const maxAge = Math.max(...developers.map(dev => dev.age)) // encontrar la edad maxima
return developers.filter((dev => dev.age === maxAge))
}