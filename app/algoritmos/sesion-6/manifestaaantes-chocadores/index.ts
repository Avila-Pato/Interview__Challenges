export default function manifestantesChocadores(manifestantes: string) {
 const choques = new Array(manifestantes.length).fill(0) 

 for (let i = 0; i < manifestantes.length; i++) {
   if (manifestantes[i] === 'I') {
     for (let j = 0; j < i; j++) {
       if (manifestantes[j] === 'D') {
         choques[i]++
         choques[j]++
       }
     }
   }
 }

   
}
console.log(manifestantesChocadores('ID'))