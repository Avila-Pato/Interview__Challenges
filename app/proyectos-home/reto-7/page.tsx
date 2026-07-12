"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState<string[]>([]);
  
  const [isLoaded, setIsLoaded] = useState(false);
  // 1. Cargar datos del localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem("questions_data");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setQuestions(JSON.parse(saved));
      } catch (error) {
        console.error("Error al parsear localStorage", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("questions_data", JSON.stringify(questions));
    }
  }, [questions, isLoaded]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const question = (formData.get("question") as string) ?? "";

    if (question.trim()) {
      // Agregamos la pregunta al estado
      setQuestions((prev) => [...prev, question.trim()]);
      // Limpiamos el formulario
      event.currentTarget.reset();
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start p-6 gap-6">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md overflow-hidden rounded-xl shadow-lg bg-pink-500 gap-2 p-4"
      >
        <label className="flex justify-center items-center text-white text-xl font-bold">
          Questioncy
        </label>

        <input
          name="question"
          type="text"
          placeholder="Me pregunto si..."
          className="w-full bg-white text-gray-800 text-lg px-4 py-2 rounded-md outline-none"
          autoComplete="off"
        />

        <div className="flex flex-col w-full pt-2">
          <button 
            type="submit" 
            className="bg-white text-pink-600 font-bold py-2 px-4 rounded-md hover:bg-pink-100 transition-colors"
          >
            Enviar Pregunta
          </button>
        </div>
      </form>

      {/* Renderizado de las preguntas guardadas */}
      <section className="w-full max-w-md flex flex-col gap-3">
        <h2 className="text-lg font-bold text-gray-700">Preguntas guardadas:</h2>
        
        {questions.length === 0 ? (
          <p className="text-gray-400 italic">No hay preguntas aún.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {questions.map((q, index) => (
              <li 
                key={index} 
                className="bg-gray-100 p-3 rounded-lg border border-gray-200 text-gray-800 shadow-sm"
              >
                {q}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}