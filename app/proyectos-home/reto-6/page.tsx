"use client";
import { useEffect, useState } from "react";


function App() {
    const [diasRestantes, setDiasRestantes] = useState(0);
    
    useEffect(() => {
        const Today = new Date();
        // el mes de 6 es julio 0 es enero y 25 es el 25 de julio
        const fechaFeriado = new Date(Today.getFullYear(), 6, 16);

        // si el feriado de este a;o ya paso, pasamos al feriado del proximo a;o
        if(Today > fechaFeriado) {
            fechaFeriado.setFullYear(fechaFeriado.getFullYear() + 1, 6, 16);
        }

        // calculamso la diferencia en milisegundos
        const diferencisMs = fechaFeriado.getTime() - Today.getTime();

        // calculamos la diferencia en dias
        const diasRestantes = Math.ceil(diferencisMs / (1000 * 60 * 60 * 24));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDiasRestantes(diasRestantes);
    },[])


  return (
    <main>
      <h1>Faltan {diasRestantes} días para el próximo feriado</h1>
    </main>
  );
}

export default App;