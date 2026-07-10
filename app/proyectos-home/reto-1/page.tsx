/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pokemon } from "./types";
import pokemonService from "./api";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  
  // Estados para el flujo del juego
  const [guess, setGuess] = useState<string>("");
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // Estados para contadores de puntuacion e intentos
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<string>("");
  const [isCorrectGuess, setIsCorrectGuess] = useState<boolean | null>(null);

  // Carga el record guardado del usuario al montar el componente por primera vez
  useEffect(() => {
    const saveHighScore = localStorage.getItem("pokemon_high_score");
    if (saveHighScore) {
      setHighScore(parseInt(saveHighScore, 10));
    }
  }, []);

  // Verifica manualmente si el texto ingresado coincide con el nombre del Pokemon
  const handleCheckGuess = () => {
    if (!pokemon || isRevealed) return;

    const isCorrect = guess.toLowerCase().trim() === pokemon.name.toLowerCase().trim();
    
    
    // Suma un intento siempre que se presiona el boton de validar
    setAttempts((prev) => prev + 1);

    // Si es correcto, revela el Pokemon, suma un punto y evalua si rompe el record actual
    if (isCorrect) {
      setIsCorrectGuess(true);
      setShowCorrectAnswer(pokemon.name);
      setIsRevealed(true);
      const newScore = score + 1;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("pokemon_high_score", newScore.toString());
      }
    } else {
      // Si no es correcto, se limpia el input
      setIsCorrectGuess(false);
      setShowCorrectAnswer(pokemon.name);
      setIsRevealed(true);
      setGuess("");
    }
  };

  // Obtiene un nuevo Pokemon de la API y restablece los estados del juego
  const fetchNextPokemon = async () => {
    // Si el usuario cambia de Pokemon sin adivinarlo, se penaliza sumando un intento
    if (pokemon && !isRevealed) {
      setAttempts((prev) => prev + 1); 
    }

    setLoading(true);
    setShowCorrectAnswer("");
    setGuess(""); 
    setIsRevealed(false); 
    try {
      const data = await pokemonService.random();
      setPokemon(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Trae el primer Pokemon de forma automatica al cargar la pantalla
  useEffect(() => {
    fetchNextPokemon();
  }, []);

  if (loading) {
    return <p className="nes-text flex flex-col justify-center items-center h-screen text-2xl">Loading...</p>;
  }
  
  return (
    <div className="h-screen min-w-2xl flex flex-col justify-center items-center gap-4">
      {/* Panel superior de puntuaciones */}
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="flex gap-6 text-lg font-bold">
          <div className="nes-text is-primary">Adivinados: {score}</div>
          <div className="nes-text is-error">Intentos: {attempts}</div>
          <div className="nes-text is-warning">Record: {highScore}</div>
        </div>
      </div>

      {error && <p className="nes-text is-error">Error: {error}</p>}
         
      {/* Contenedor principal de la tarjeta del Pokemon */}
      {pokemon && (
        <div className="nes-container with-title is-centered flex justify-center items-center flex-col">
          <h1>{isRevealed ? pokemon.name : "???"}</h1>
          {pokemon.image && (
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={200}
              height={200}
              className={`transition-all duration-300 select-none pointer-events-none ${
                isRevealed ? "brightness-100" : "brightness-0"
              }`}
            />
            
          )}
           <div>
            {showCorrectAnswer && (
              <p className={`nest-text ${isCorrectGuess ? "is-success" : "is-error"}`}>
                {isCorrectGuess 
                ? ` ¡Correcto! El Pokemon era ${showCorrectAnswer}!`
                : ` ¡Incorrecto! El Pokemon era ${showCorrectAnswer}!`
              }
              </p>
            )}
        </div>
        </div>
      )}

      {/* Seccion dinamica de botones de control */}
      <div className="flex gap-4">
        {!isRevealed ? (
          <button className="nes-btn is-primary" onClick={handleCheckGuess}>
            Adivinar
          </button>
        ) : (
          <button className="nes-btn is-success" onClick={fetchNextPokemon}>
            Siguiente
          </button>
        )}
        
        {!isRevealed && (
          <button className="nes-btn is-error" onClick={fetchNextPokemon}>
            Saltar
          </button>
        )}
        {setHighScore && (
          <button
            className="nes-btn is-warning"
            onClick={() => {
              setScore(0);
              setAttempts(0);
              setHighScore(0);
              localStorage.setItem("pokemon_high_score", "0");
            }}
          >
            Reiniciar
          </button>
        )}
      </div>
    
      {/* Input para la respuesta del usuario */}
      <div className="nes-field flex flex-col gap-2 justify-center items-center">
        <input
          type="text"
          id="name_field"
          className="nes-input"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={isRevealed}
          placeholder="Escribe el nombre..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCheckGuess();
          }}
        />
      </div>
    </div>
  );
}
