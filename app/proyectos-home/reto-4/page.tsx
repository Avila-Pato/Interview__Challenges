/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
"use client";
import { useEffect, useState } from "react";

const array = [
  { id: 1, color: "red" },
  { id: 2, color: "green" },
  { id: 3, color: "blue" },
  { id: 4, color: "yellow" },
  { id: 5, color: "orange" },
  { id: 6, color: "purple" },
]

const colorsList = ["red", "green", "blue", "yellow", "orange", "purple"];


export default function Page() {
  const [puntos, setPuntos] = useState<number>(0);
  const [segundos, setSegundos] = useState<number>(60);
  const [targetColor, setTargetColor] = useState<number | string>("");
  const [startGame, setStartGame] = useState<boolean>(false);
  const [bgColors, setBgColors] = useState<string[]>([]);

  // Requisitos
  // Ver un botón de "Jugar" el cual el usuario debe clickear para poder empezar.
  // Un contador en segundos que indique el tiempo transcurrido desde que se empezó a jugar.
  // Al llegar a 10 el tiempo debe detenerse y mostrar un botón de "Reiniciar" para permitirle al usuario volver a jugar.

  useEffect(() => {
    const timer = setTimeout(() => {
      if(!startGame || segundos <= 0) return

      setSegundos((prev) => {
        if(prev <= 1) {
          setStartGame(false);
          return 0;
        }
        return prev - 1
      });
    }, 1000);
    return () => clearTimeout(timer);

  },[segundos, startGame]);

  // Generar colores aleatorios para los fondos de lso botones
  const generateRamdonBgColors = () => {
    const generated = array.map(() => {
      const ramdonIndex = Math.floor(Math.random() * colorsList.length);
      return colorsList[ramdonIndex];
    })
    setBgColors(generated);
  }

  //Seleciona un neuvo color objetivo y mezcla los fondos
  const nextRound = () => {
    const randomIndex = Math.floor(Math.random() * array.length);
    setTargetColor(array[randomIndex].color);
    generateRamdonBgColors();
  }

  //Iniciar / reiniciar juego
  const handleStartGame = () => {
    setPuntos(0);
    setSegundos(10);
    setStartGame(true);
    nextRound();
  }

  //Validar si el boton cliqueado coincide con el texto objetivo

  const habdleSelectColor = (selectedTextColor: string) => {
    if(!startGame) return;

    if(selectedTextColor === targetColor) {
      setPuntos((prev) => prev + 10);
    } else {
      setPuntos((prev) => prev - 5);
    }

    nextRound();
  }
  

  return (
    <main style={styles.mainSection} >
      <header>
        <h1>{puntos} puntos</h1>
        <h1>{segundos} segundos</h1>
      </header>
      <section>
        <div style={styles.sectionMain}>
          {array.map((item, index) => (
            <div
              key={item.id}
              onClick={() => habdleSelectColor(item.color)}
              style={{
                backgroundColor: bgColors[index],
                cursor: "pointer",
                color: 'white'
              }}
            >
              <p>{item.color}</p>
            </div>
          ))}
        </div>
      </section>
      <h2>
        {startGame
        ? `Haz clic en el color ${targetColor}`
        : segundos === 0
        ? "Tiempo agotado"
        : "Haz clic en jugar para comenzar"
        }
      </h2>
      <footer>
        <button onClick={handleStartGame} disabled={startGame} >
          {segundos === 0 ? "Reiniciar" : "Jugar"}
        </button>
      </footer>
    </main>
  );
}


const styles: Record<string, React.CSSProperties> = {
  mainSection: {
  display: "grid",
  textAlign: "center",
  height: "100vh",
  width: "100vw",
  },
  sectionMain: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};