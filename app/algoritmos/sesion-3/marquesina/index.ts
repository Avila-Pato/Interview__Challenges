export default function marquesina(texto: string): string[] {
    const resultado: string[] = [texto]

    let actual = texto

    for (let i = 0; i < texto.length - 1; i++) {
        actual = actual.slice(1) + actual[0]
        resultado.push(actual)
    }

    return resultado
}