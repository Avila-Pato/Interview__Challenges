/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";

import api from "./api";
import { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.list().then(setUsers);
  }, []);

  useEffect(() => {
    const storagedUsers = localStorage.getItem("users");
    if (storagedUsers)
      try {
        {
          setUsers(JSON.parse(storagedUsers));
        }
      } catch (error) {
        console.error(error);
      }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // event.currentTarget.reset() otra manera de limpiar input
    // si tuvieran estado podria tambin hacerse asi
    //setName("")
    //setEmail("")

    setUsers((users) => users.concat({ id: Date.now(), name, email }));

    form.reset(); // limpiar input
  }

  const ordenarLista = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;

    const listaOrdenada = [...users].sort((a, b) => {
      if (option === "asc") {
        return a.name.localeCompare(b.name);
      } else if (option === "des") {
        return b.name.localeCompare(a.name);
      }
      // return 0 proque al cargar la pagina el valor de seleccioanr orden aun no a sido seleccionado   ni 'asc' ni 'desc'
      return 0;
    });
    setUsers(listaOrdenada);
  };
  // Ordenar directamente la lista.
  // const listaOrdenara = [...users].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" required />
        <input name="email" placeholder="Email" required type="email" />
        <button>Agregar</button>
      </form>
      <select onChange={ordenarLista}>
        <option value="" disabled>
          Elija
        </option>
        <option value="asc">Ascender</option>
        <option value="des">Desdencer</option>
      </select>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
