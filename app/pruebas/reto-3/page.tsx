"use client";
import {useEffect, useRef, useState} from "react";
import { User } from "./types/type";
import api, { MAX_USERS } from "./api/api";


function App() {

  const [users, setUsers] = useState<User[]>([]);
  const scrollPonterRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  function loadMore(start: number) {
    if (loadingRef.current) return;
    loadingRef.current = true;
    api.list({ start }).then(({ items }) => {
      setUsers((prev) => [...prev, ...items]);
      loadingRef.current = false;
    });
  }

  useEffect(() => {
    api.list().then(({ items }) => setUsers(items));
  }, []);

  const allLoaded = users.length >= MAX_USERS;

  useEffect(() => {
    if (allLoaded) return;
    const start = users.length;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore(start);
      }
    });

    if (scrollPonterRef.current) {
      observer.observe(scrollPonterRef.current);
    }

    return () => observer.disconnect();
  }, [users.length, allLoaded])

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={`${user.id}`}>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </li>
        ))}
      </ul>
      <div ref={scrollPonterRef}></div>
      <button onClick={() => loadMore(users.length)} disabled={allLoaded}>
        {allLoaded ? "Ya no hay más usuarios" : "Cargar más"}
      </button>
    </main>
  );
}

export default App;
