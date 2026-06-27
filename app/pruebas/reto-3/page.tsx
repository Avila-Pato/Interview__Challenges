"use client";
import {useCallback, useEffect, useRef, useState} from "react";
import { User } from "./types/type";
import api, { MAX_USERS } from "./api/api";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const scrollPointerRef = useRef<HTMLDivElement | null>(null)

 const handleLoadMore = useCallback(() => {
  api.list({ start: users.length, count: 8 }).then(({ items }) => {
    setUsers((prev) => [...prev, ...items]);
  });
}, [users.length]);
  
  const disableButton =  users.length >= MAX_USERS

  useEffect(() => {
    if(scrollPointerRef.current === null) return
    
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if(entry.isIntersecting){
        handleLoadMore()
      }
    })
    observer.observe(scrollPointerRef.current)

    return  () => {
      observer.disconnect()
    }
  },[handleLoadMore])
  
  

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
      <div ref={scrollPointerRef}></div>
      <button onClick={handleLoadMore} disabled={disableButton}>
        {disableButton ? "No hay mas usuarios" : "cargar mas"}
      </button>
    </main>
  );
}

export default App;