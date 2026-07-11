"use client";
import { useState } from "react";
import { askLlama } from "./api/actions";

export default function Page() {
  const [message, setMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    setLoading(true);
    setChatResponse(""); 

    // Llama al servidor de forma segura pasando el mensaje del input
    const result = await askLlama(message);

    if (result.success && result.content) {
      setChatResponse(result.content);
    } else {
      setChatResponse(result.error || "Ocurrio un error.");
    }
    
    setLoading(false);
  };

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4 py-6 max-w-2xl">
      <header className="text-xl font-bold leading-[4rem] border-b border-gray-100">
        EntrevistAIdor
      </header>

      <section className="py-8 overflow-y-auto flex flex-col gap-4">
        <div className="bg-gray-50 rounded-lg p-4 min-h-[150px] border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Respuesta IA:</p>
          {loading ? (
            <p className="text-gray-500 animate-pulse">Pensando...</p>
          ) : (
            <p className="text-gray-800 whitespace-pre-line">{chatResponse || "Haz una pregunta para comenzar."}</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <input
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Escribe tu pregunta"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Enviar
          </button>
        </form>
      </section>

      <footer className="text-center leading-[4rem] opacity-70 text-xs">
        © {new Date().getFullYear()} EntrevistAIdor
      </footer>
    </main>
  );
}