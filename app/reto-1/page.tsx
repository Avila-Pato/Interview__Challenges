"use client";
import {useEffect, useState} from "react";
import { User } from "./types/types";
import api from "./api/api";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [checkedUsers, setCheckedUsers] = useState<number[]>([])

  useEffect(() => {
    api.list().then(({items}) => setUsers(items));
  }, []);

  async function handleRemove(id: number) {
    await api.remove(id);
    setUsers((users) => users.filter((user) => user.id !== id));
  }

  const handleSelectedUser = (id: number) => {
    const isSelected = selectedUsers.includes(id);

    setSelectedUsers((prevSelected) => 
      isSelected ? prevSelected.filter((userId) => userId !== id) : [...prevSelected, id]
    )
  }

  const handleDeleteSelected = () => {
      Promise.all(selectedUsers.map((id) => api.remove(id))).then(() => {
        setUsers((users) => users.filter((user) => !selectedUsers.includes(user.id)));
        setSelectedUsers([]);
      })

      // const data = Promise.allSettled(selectedUsers.map((id) => api.remove(id)));
      //   data.then((results) => {
      //     const successfulDeletions = results.filter(result => result.status === "fulfilled").map(result => result.value);
      //     setUsers((users) => users.filter((user) => !successfulDeletions.includes(user.id)));
      //     setSelectedUsers([]);
      //   })

  }

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <div className="toolbar">
        <span className="muted">{selectedUsers.length} {selectedUsers.length === 1 ? "usuario" : "usuarios"} seleccionados</span>
        <button onClick={handleDeleteSelected} disabled={selectedUsers.length === 0}>
          Eliminar seleccionados
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelectedUser(user.id)} />
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