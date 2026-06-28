import { Developer } from "./type";

export default function pedirDetalles(developers: Developer[]): Developer[] {

  return developers.flatMap((dev) => {
    const missingField = Object.keys(dev).find((key) => dev[key as keyof Developer] === null)

    if (!missingField) return []

    return [{
      ...dev,
      question: `Hi, could you please provide your ${missingField}.`
    }]
  })

}