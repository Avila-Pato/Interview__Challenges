"use client";
import {useEffect, useState} from "react";

import api, { MAX_USERS } from "./api";
import {User} from "./types";
import { Skeleton } from "./components/Skeleton";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  function handleLoadMore() {
    api.list({ start: users.length, count: 3 }).then(({ items }) => {
      setUsers((prev) => [...prev, ...items])

    }).finally(() => {
      setLoading(false);
    })

  }

  useEffect(() => {
    handleLoadMore();
  },  []);



  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <small>{users.length} usuarios {MAX_USERS.toLocaleString()}</small>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
        {loading && <Skeleton />}
      </ul>
      <button onClick={handleLoadMore} type="button" disabled={users.length >= MAX_USERS }>
        {users.length >= MAX_USERS ? "No hay mas usuarios" : "Cargar mas"}
      </button>
    </main>
  );
}

export default App;