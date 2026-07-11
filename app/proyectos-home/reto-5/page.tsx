"use client";
import {  useRef, useState } from "react";

type GameState = "idle" | "espere" | "listo" | "resultado" | "muy pronto";
type Units = "ms" | "s";

//Debemos implementar un juego que nos permita medir nuestros reflejos.
function App() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // referencias para manejar tiempos sin provocar re-rednder innecesarios
  const timeOutId = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(0);

  //estados para la unidad de medida 
  const [unit, setUnit] = useState<Units>("ms");

  //formatiar tiempo segun unidad
  const formatTime = (timeInMs: number | null) => {
    if(timeInMs === null) return "-";
    return unit === "ms" 
      ? `${timeInMs} ms` 
      : `${(timeInMs / 1000).toFixed(3)} s`;
  }

  const handleClick = () => {
    if (
      gameState === "idle" ||
      gameState === "resultado" ||
      gameState === "muy pronto"
    ) {
      // iniciar intento cambiar a estado de espere
      setGameState("espere");
      // tiempo de espera aleatorio entre 2 y 5 segundos
      const randomDelay = Math.floor(Math.random() * 4000) + 2000;

      timeOutId.current = setTimeout(() => {
        setGameState("listo");
        startTime.current = Date.now();
      }, randomDelay);
    } else if (gameState === "espere") {
      // click antes de tiempo (falsa alarma)
      if (timeOutId.current) clearTimeout(timeOutId.current);
      setGameState("muy pronto");
    } else if (gameState === "listo") {
      // click correcto al reaccionar
      const timeTaken = Date.now() - startTime.current;
      setReactionTime(timeTaken);
      setGameState("resultado");

      // actualizar record personal (el menor tiempo)
      setBestScore((prev) =>
        prev === null || timeTaken < prev ? timeTaken : prev,
      );
    }
  };
  const handleReset = () => {
    setReactionTime(null);
    setBestScore(null);
    setGameState("idle");
  }
  // helper para obtener color de fondo e instrucciones dinamicas
  const getBoxConfig = () => {
    switch (gameState) {
      case "espere":
        return {
          bg: "bg-red-600! hover:bg-red-700",
          text: "¡Espera al color VERDE!",
        };
      case "listo":
        return {
          bg: "bg-green-500! hover:bg-green-600",
          text: "¡HAZ CLIC AHORA!",
        };
      case "muy pronto":
        return {
          bg: "bg-amber-600! hover:bg-amber-700",
          text: `¡Tu tiempo: ${formatTime(reactionTime)}! Haz clic para jugar otra vez.`,
        };
      case "resultado":
        return {
          bg: "bg-blue-600! hover:bg-blue-700",
          text: `¡Tu tiempo: ${reactionTime} ms! Haz clic para jugar otra vez.`,
        };
      default:
        return {
          bg: "bg-gray-600! hover:bg-gray-700",
          text: "Haz clic aquí para comenzar",
        };
    }
  };

  const currentConfig = getBoxConfig();

return (
    <main className="flex flex-col gap-6 items-center w-full max-w-xl mx-auto p-4">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Prueba de Reflejos
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Haz clic en el cuadro cuando cambie a verde lo más rápido que puedas.
        </p>

        {/* Conmutador de Unidad (ms / s) */}
        <div className="flex justify-center items-center gap-2 mt-4">
        
        
        </div>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 w-full items-center">
        <button
          onClick={handleClick}
          className={`w-full h-64 sm:h-80 ${currentConfig.bg} text-white text-2xl font-bold 
          rounded-2xl transition-colors duration-200 select-none p-6 shadow-lg flex items-center justify-center text-center`}
        >
          {currentConfig.text}
        </button>

        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-2xl w-full sm:w-48 h-32 sm:h-80 border border-gray-200">
          <small className="text-gray-500 font-semibold uppercase text-xs tracking-wider">
            Récord Personal
          </small>
          <h2 className="text-2xl font-black text-gray-800 mt-2 text-center">
            {formatTime(bestScore)}
          </h2>
        </div>
     
      </div>
         <button onClick={handleReset}>
          Reiniciar
        </button>
    </main>
  );
}

export default App;

