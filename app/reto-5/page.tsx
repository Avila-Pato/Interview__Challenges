"use client";
import {useEffect, useRef, useState} from "react";
import { User } from "./types/type";
import api from "./api/api";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const historyRef = useRef<User[][]>([]);
  const futureRef = useRef<User[][]>([]);
  const usersRef = useRef<User[]>([]);

  useEffect(() => {
    api.list().then(setUsers);
  }, []);

  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "Z" && futureRef.current.length > 0) {
        historyRef.current = [...historyRef.current.slice(-2), usersRef.current];
        setUsers(futureRef.current.pop()!);
        
      } else if (e.ctrlKey && !e.shiftKey && e.key === "z" && historyRef.current.length > 0) {
        futureRef.current = [...futureRef.current.slice(-2), usersRef.current];
        setUsers(historyRef.current.pop()!);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  
  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(formRef.current!);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    const user = await api.add({name, email});

    historyRef.current = [...historyRef.current.slice(-2), users];
    futureRef.current = [];
    setUsers((users) => users.concat(user));

    formRef.current?.reset();
  }

  async function handleRemove(id: number) {
    historyRef.current = [...historyRef.current.slice(-2), users];
    futureRef.current = [];
    const previous = users;
    setUsers((users) => users.filter((user) => user.id !== id));

    // si falla el api.remove() catch restaura los usuarios anteriores exactamente mas rapido
    try {
      await api.remove(id);
    } catch {
      setUsers(previous);
    }
  }

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <form  ref={formRef} onSubmit={handleSubmit} >
        <input name="name" placeholder="Nombre" />
        <input name="email" placeholder="Email" />
        <button>Agregar</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
            <button className="remove" onClick={() => handleRemove(user.id)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;