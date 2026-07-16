"use client";
import { useEffect, useState } from "react";

import api from "./api";
import { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const matches = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase()),
  );

  // Argument of type 'void' is not assignable to parameter of type '(() => void) | null | undefined'.
  // Setloading se ejecuta inmediatament y devuelve void sin embargo finally( espera una funcion) ( () => void)
  // que es igual a (() => setLoading(false))
  useEffect(() => {
    api
      .list()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <input
        placeholder="Buscar por nombre"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ul>
        <small>Total de usuarios {matches && <p>{users.length}</p>}</small>
        <small>
          {matches.length} resultados de {users.length} usuarios
        </small>

        {loading ? (
          <p>Cargando...</p>
        ) : matches.length > 0 ? (
          matches.map((user) => (
            <li key={user.id}>
              <div>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
            </li>
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </ul>
    </main>
  );
}

export default App;
