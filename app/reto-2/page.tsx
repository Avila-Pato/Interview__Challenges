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
    setUsers((users) => users.filter((user) => user.id !== id));
  }

  function moveUp(id: number) {
    if (id === 0) return;

    setUsers((prev) => {
      const newUsers = [...prev];

      const index = newUsers.findIndex((user) => user.id === id);
      if (index > 0) {
        [newUsers[index - 1], newUsers[index]] = [
          newUsers[index],
          newUsers[index - 1],
        ];
      }

      return newUsers;
    });
  }

  function moveDown(id: number) {
    setUsers((prev) => {
      const newUsers = [...prev];

      const index = newUsers.findIndex((user) => user.id === id);
      if (index < newUsers.length - 1) {
        [newUsers[index + 1], newUsers[index]] = [
          newUsers[index],
          newUsers[index + 1],
        ];
      }

      return newUsers;
    });
  }

  async function handleBulkRemove() {
    if (selectedIds.length === 0) return;
    const { succeeded } = await api.bulkSetActive(selectedIds, false);
    setUsers((users) => users.filter((user) => !succeeded.includes(user.id)));
    setSelectedIds((prev) => prev.filter((id) => !succeeded.includes(id)));
  }

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <div className="toolbar">
        <span className="muted">{selectedIds.length} seleccionados</span>
        <button
          className="remove"
          onClick={handleBulkRemove}
          disabled={selectedIds.length === 0}
        >
          Eliminar usuarios
        </button>
      </div>
      <ul>
        {users.map((user) => (
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
            <button className="move-up" onClick={() => moveUp(user.id)}>
              ↑
            </button>
            <button className="move-down" onClick={() => moveDown(user.id)}>
              ↓
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
