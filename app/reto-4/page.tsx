"use client";
import React, { useEffect, useState} from "react";
import { User } from "./types/types";
import api from "./api/api";



type Sort = "desc" | "asc";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("")
  const [sorted, setSorted] = useState<Sort>("asc")

  useEffect(() => {
    api.list().then(setUsers);
  }, []);

  // 
  const sortedUsers = users.sort((a, b) => {
    if (sorted === "asc") {
      return a.email.localeCompare(b.email);
    } else {
      return b.email.localeCompare(a.email);
    }
  });

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); // previene que el formulario actualize cada ves que se agrega un usaurio
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
  

    if (users.some((u) => u.email === email)) {
      setError("Este correo ya fue registrado.");
      return;
    }

    setError("");

    setUsers((users) =>
      users.concat({id: Date.now(), name, email}),
    );

   

    form.reset() // limpia el input
  }

  function handleSlected(e:React.ChangeEvent<HTMLSelectElement>) {
    setSorted(e.target.value as Sort);
  }

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      {error && (
        <span className="bg-red-500">Usuario registrado</span>
      )}
      <form onSubmit={handleSubmit}>
        <input required name="name" placeholder="Nombre" />
        <input required name="email" placeholder="Email" />
        <button>Agregar</button>
      </form>
      <select onChange={handleSlected}>
        <option value={"asc"}>asc</option>
        <option value={"desc"}>desc</option>
      </select>
      <ul>
        {sortedUsers.map((user) => (
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