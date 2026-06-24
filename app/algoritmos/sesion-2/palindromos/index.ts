export default function posiblePalindromo(num: number): boolean {
    return num.toString() === num.toString().split("").reverse().join("");
}