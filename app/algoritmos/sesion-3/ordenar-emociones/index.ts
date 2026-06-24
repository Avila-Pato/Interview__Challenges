import type { Emocion } from "./types";

export default function ordenarEmociones(emociones: Emocion[], orden: boolean): Emocion[] {
    return emociones.sort((a, b) => (orden ? b.localeCompare(a) : a.localeCompare(b)) )
}