export default function lasMoscasComedoras(numero: number) {
    const santi = numero * (numero + 1) / 2;

    const mitad = Math.floor(santi / 2);

    const siri = mitad * (mitad + 1) / 2;

    const ubi = santi + siri;

    return ``
        + `Santi se comió ${santi} moscas, `
        + `Siri se comió ${siri} moscas y `
        + `Ubi se comió ${ubi} moscas`;

}