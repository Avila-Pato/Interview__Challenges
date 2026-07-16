/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";

import api from "./api";
import { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Flag para saber cuándo terminamos de cargar localStorage
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  // 1. Cargar desde localStorage usando useEffect
  useEffect(() => {
    const storagedUsers = localStorage.getItem("users");
    if (storagedUsers) {
      try {
        setUsers(JSON.parse(storagedUsers));
      } catch (error) {
        console.error("Error al parsear localStorage", error);
      }
    }
    setIsStorageLoaded(true); // Marcamos que el storage ya fue procesado
  }, []);

  // 2. Guardar en localStorage solo DESPUÉS de haber cargado el storage inicial
  useEffect(() => {
    if (isStorageLoaded) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users, isStorageLoaded]);

  // 3. Petición a la API: Solo se ejecuta si hay una búsqueda activa
  useEffect(() => {
    // Si no se ha cargado el storage o el input de búsqueda está vacío, no consultamos la API
    if (!isStorageLoaded) return;

    let isSubscribed = true;
    setLoading(true);

    api
      .search(query)
      .then((searchResults) => {
        if (isSubscribed) {
          setUsers(searchResults);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      isSubscribed = false;
    };
  }, [query, isStorageLoaded]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    api.add({ id: Date.now(), name, email }).then((newUser) => {
      setUsers((prev) => [...prev, newUser]);
    });
    form.reset();
  }

  function handleRemove(id: number) {
    api
      .remove(id)
      .then(() => setUsers((prev) => prev.filter((u) => u.id !== id)));
  }

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <input
        placeholder="Buscar por nombre o email"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" />
        <input name="email" placeholder="Email" />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {loading ? (
          <p>Cargando...</p>
        ) : users.length > 0 ? (
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
        ): <p>No hay usuarios con ese nombre</p>}
      </ul>
    </main>
  );
}

export default App;