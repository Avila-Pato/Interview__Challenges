"use client";
import {useEffect, useRef, useState} from "react";
import { User } from "./types/types";
import api from "./api/api";


function App() {
  const checkAllRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])


  useEffect(() => {
    api.list().then(({items}) => setUsers(items));
  }, []);

  // determinar el ckekbox determinado usando REF
  useEffect(() => {
    if (!checkAllRef.current) return;
    checkAllRef.current.indeterminate = selectedUsers.length > 0 && selectedUsers.length < users.length;
    checkAllRef.current.checked = selectedUsers.length === users.length && users.length > 0;
  }, [selectedUsers, users]);

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

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUsers(event.target.checked ? users.map((u) => u.id) : []);
  };

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <div className="toolbar">
        <span className="muted">{selectedUsers.length} {selectedUsers.length === 1 ? "usuario" : "usuarios"} seleccionados</span>
        <button onClick={handleDeleteSelected} disabled={selectedUsers.length === 0}>
          Eliminar seleccionados
        </button>
      </div>
      <label>
      <input 
       ref={checkAllRef}
       type="checkbox" onChange={handleCheckAll}/>
         selecionar todos
      </label>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <input 
             type="checkbox"
             checked={selectedUsers.includes(user.id)} 
             onChange={() => handleSelectedUser(user.id)} 
            />
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