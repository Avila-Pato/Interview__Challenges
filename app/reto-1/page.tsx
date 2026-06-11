"use client";
import {useCallback, useEffect, useRef, useState} from "react";
import { User } from "./types/types";
import api from "./api/api";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(() => {
    if(isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    api.list({start: users.length, count: 3}).then((result) => {
      setUsers((prevUsers) => [...prevUsers, ...result.items]);
      isLoadingRef.current = false;
      setIsLoading(false);
    });
  }, [users.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleLoadMore();
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleLoadMore]);

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
      {isLoading && (
        <>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
          <div className="skeleton"></div>
        </>
      )}
      <div ref={sentinelRef} />
      <button onClick={handleLoadMore} disabled={users.length === api.total}>Cargar más</button>
    </main>
  );
}

export default App;
