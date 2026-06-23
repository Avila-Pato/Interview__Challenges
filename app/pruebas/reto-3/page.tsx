"use client";
import {useEffect, useRef, useState} from "react";
import { User } from "./types/type";
import api, { MAX_USERS } from "./api/api";


function App() {
  const loaderRef = useRef(null)
  const [users, setUsers] = useState<User[]>([]);

  function handleLoadMore() {
    api.list({ start: users.length }).then(({ items }) => {
      setUsers((prev) => [...prev, ...items]);
    });
  }

  useEffect(() => {
    // const observer = new IntersectionObserver(([entry]) => {
    //   if(entry.isIntersecting) {
    //     handleLoadMore()
    //   }
    // })
    // observer.observe(loaderRef.current!)

    // return () => {
    //     observer.disconnect()
    // }
    api.list().then(({ items }) => setUsers(items));
  }, []);

  return (
    <main>
      <h1>Directorio de usuarios</h1>
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
      <button onClick={handleLoadMore} disabled={users.length >= MAX_USERS}>{users.length >= MAX_USERS ? "Ya no hay mas usuarios" : "Cargar más"}</button>
    </main>
  );
}

export default App;