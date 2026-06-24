import { estudiantes, type Estudiante } from "./types";


export default function encontrarHackers(estudiantes: Estudiante[]): string[] {
    const hackers: string[] = []

      for (const [estudiante, puntos, notas] of estudiantes) {
            if(puntos >= 200) {
                hackers.push(estudiante)
            }
      }

      return hackers
    }
