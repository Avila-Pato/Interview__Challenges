"use client";
import {useEffect, useState} from "react";
import { User } from "./types/types";
import api from "./api/api";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    let ignore = false

    api.search(query).then((result) => {
        if(!ignore) {
            setUsers(result)
            setLoading(false)
        }
    });

    return () => {
        ignore = true
    }
  }, [query]);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true)
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

   
    if(users.some((u) => u.email === email)) {
        setError("Correo ya registrado")
        setSubmitting(false)
        return;
    }
    setError("")

    const user = await api.add({name, email});
    setUsers((users) => users.concat(user))
    setSubmitting(false)
    form.reset();
  }

  function handleRemove(id: number) {
   api.remove(id);
   setUsers((users) => users.filter((u) => u.id !== id))
  }

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      {error && (
        <p>Correo ya registrado</p>
      )}
      <input
        placeholder="Buscar por nombre o email"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre"  required/>
        <input name="email" placeholder="Email"  required/>
        <button type="submit" disabled={submitting} >
              {submitting ? "agregando..." : "Agregar"}
        </button>
      </form>
      <ul>
        {loading ? <p>Cargando... </p> : users.map((user) => (
          <li key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
            <button className="remove" onClick={() => handleRemove(user.id)} >
                Borrar
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;