"use client";

import { useEffect, useRef, useState } from "react";
import api from "./api";
import { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(true);

  // 1. Dos pilas para el historial de estados
  const [history, setHistory] = useState<User[][]>([]);
  const [redoStack, setRedoStack] = useState<User[][]>([]);

  useEffect(() => {
    api.list().then(setUsers).finally(() => setLoading(false));
  }, []);

  // Función auxiliar para registrar acciones nuevas
  const recordAction = () => {
    setHistory((prev) => [...prev, users]);
    setRedoStack([]); // Al hacer una acción nueva, se limpia la pila de rehacer
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (!name || !email) return;

    recordAction();

    const user = await api.add({ name, email });
    setUsers((prev) => [...prev, user]);

    formRef.current?.reset();
  }

  async function handleRemove(id: number) {
    recordAction();

    await api.remove(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }

  // 2. Manejo de atajos de teclado (Ctrl+Z y Ctrl+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA";

      // Si el usuario está escribiendo en un input, no interferimos
      if (isInputActive) return;

      const isCmdOrCtrl = event.ctrlKey || event.metaKey;
      const key = event.key.toLowerCase();

      // REHACER: Ctrl + Shift + Z  o  Ctrl + Y
      if (isCmdOrCtrl && ((event.shiftKey && key === "z") || key === "y")) {
        event.preventDefault();

        setRedoStack((prevRedo) => {
          if (prevRedo.length === 0) return prevRedo;

          const newRedo = [...prevRedo];
          const nextState = newRedo.pop();

          if (nextState) {
            setHistory((prevHist) => [...prevHist, users]); // Guardamos actual en pasados
            setUsers(nextState); // Restauramos
          }

          return newRedo;
        });
        return;
      }

      // DESHACER: Ctrl + Z
      if (isCmdOrCtrl && key === "z" && !event.shiftKey) {
        event.preventDefault();

        setHistory((prevHistory) => {
          if (prevHistory.length === 0) return prevHistory;

          const newHistory = [...prevHistory];
          const previousState = newHistory.pop();

          if (previousState) {
            setRedoStack((prevRedo) => [...prevRedo, users]); // Guardamos actual en rehacer
            setUsers(previousState); // Restauramos
          }

          return newHistory;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [users]); // 'users' en dependencias para tener la foto actualizada al mover entre stacks

  return (
    <main>
      <h1>Directorio de usuarios</h1>

      <form ref={formRef} onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" required />
        <input name="email" placeholder="Email" required type="email" />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              <div>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
              <button className="remove" onClick={() => handleRemove(user.id)}>
                Borrar
              </button>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

export default App;