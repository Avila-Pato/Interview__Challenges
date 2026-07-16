"use client";

import { useEffect, useState } from "react";
import api from "./api";
import { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  // Guardamos solo los IDs para evitar duplicar referencias de objetos
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    api.list().then(setUsers);
  }, []);

  // Función toggle para seleccionar / deseleccionar
  const toggleSelectUser = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id) // Si ya está, lo quita
        : [...prev, id] // Si no está, lo agrega
    );
  };

  function handleRemove(id: number) {
    api.remove(id);

    setUsers((users) => users.filter((user) => user.id !== id));
    // También limpiamos el ID de la selección si el usuario fue borrado
    setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
  }

  const handleRemoveSelected = async () => {
    //ejecuta las peitciones para cada usuario
    await Promise.all(selectedIds.map((id) => api.remove(id)));
    //elimina los usuarios de la lista
    setUsers((users) => users.filter((user) => !selectedIds.includes(user.id)));
    //limpia la lista de IDs seleccionados
    setSelectedIds([]);
  }

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <div className="toolbar">
        <span className="muted">
          {selectedIds.length} seleccionados de {users.length}
        </span>
        {selectedIds.length > 0 && (
          <button className="remove" onClick={handleRemoveSelected}>
            Borrar seleccionados
          </button>
        )}
      </div>
      <ul>
        {users.map((user) => {
          const isSelected = selectedIds.includes(user.id);

          return (
            <li key={user.id}>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelectUser(user.id)}
              />
              <div>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
              <button className="remove" onClick={() => handleRemove(user.id)}>
                Borrar
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;