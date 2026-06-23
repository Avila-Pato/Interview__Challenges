"use client";
import { useEffect, useState } from "react";
import { User } from "./types/type";
import api from "./api/api";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    api.list().then(setUsers);
  }, []);

  function handleSelected(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  }

  async function handleRemove(id: number) {
    await api.remove(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }

  async function handleRemoveAll() {
    await Promise.all(selectedIds.map((id) => api.remove(id)));
    setUsers((prev) => prev.filter((user) => !selectedIds.includes(user.id)));
    setSelectedIds([]);
  }

  const move = (index: number, dir: 1 | -1) => {
    setUsers((prev) => {
      const updated = [...prev];
      [updated[index], updated[index + dir]] = [updated[index + dir], updated[index]];
      return updated;
    });
  };

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <div className="toolbar">
        <span className="muted">{selectedIds.length} {selectedIds.length === 1 ? "Usuario" : "Usuarios"}</span>
        <button
          className="remove"
          disabled={selectedIds.length === 0}
          onClick={handleRemoveAll}
        >
          Eliminar usuarios
        </button>
      </div>
      <ul>
        {users.map((user, i) => (
          <li key={user.id}>
            <input
              type="checkbox"
              checked={selectedIds.includes(user.id)}
              onChange={() => handleSelected(user.id)}
            />
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
            <button className="remove" onClick={() => handleRemove(user.id)}>
              Borrar
            </button>
            <button className="move-up" disabled={i === 0} onClick={() => move(i, -1)}>
              ↑
            </button>
            <button className="move-down" disabled={i === users.length - 1} onClick={() => move(i, 1)}>
              ↓
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;