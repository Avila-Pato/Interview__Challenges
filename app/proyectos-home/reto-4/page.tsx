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


export default function Page() {
  const [puntos, setPuntos] = useState<number>(0);
  const [segundos, setSegundos] = useState<number>(60);
  const [color, setColor] = useState<number | string>("");
  const [startGame, setStartGame] = useState<boolean>(false);

  // Requisitos
  // Ver un botón de "Jugar" el cual el usuario debe clickear para poder empezar.
  // Un contador en segundos que indique el tiempo transcurrido desde que se empezó a jugar.
  // Al llegar a 10 el tiempo debe detenerse y mostrar un botón de "Reiniciar" para permitirle al usuario volver a jugar.

  useEffect(() => {
    const timer = setTimeout(() => {
      if(!startGame) return
      if(segundos <= 0) return
      setSegundos((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);

  },[segundos, startGame]);
  
  const randomColor = ()  => {
    const randomColor = Math.floor(Math.random() * array.length); 
    setColor(array[randomColor].color);
  }

  const handleStartGame = () => {
    setStartGame(true);
    randomColor();
    if(segundos === 0) {
      setStartGame(false)
    }

  }
  

  return (
    <main style={styles.mainSection}>
      <header>
        <h1>{0} puntos</h1>
        <h1>{segundos} segundos</h1>
      </header>
      <section>
        <div style={styles.sectionMain}>
          {array.map((item) => (
            <div
              key={item.id}
              // item.color
              style={{ backgroundColor: item.color }}
              // onClick={}
            >
              <p>{item.color}</p>
            </div>
          ))}
        </div>
      </section>
      <span>{startGame ? color.toString().toUpperCase() : "Apreta Jugar para empezar" }</span>
      <footer>
        <button onClick={handleStartGame} disabled={startGame} >Jugar</button>
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