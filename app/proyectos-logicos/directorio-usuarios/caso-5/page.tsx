"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import api, { MAX_USERS } from "./api";
import { User } from "./types";
import { Skeleton } from "./components/Skeleton";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollPointerRef = useRef<HTMLDivElement | null>(null);
  
  // Refs para mantener valores actualizados sin rehacer la función
  const isLoadingRef = useRef(false);
  const usersLengthRef = useRef(0);

  // Mantenemos la ref sincronizada con el state
  // eslint-disable-next-line react-hooks/refs
  usersLengthRef.current = users.length;

  const handleLoadMore = useCallback(() => {
    const currentLength = usersLengthRef.current;

    // Guardias de seguridad para evitar llamadas innecesarias
    if (isLoadingRef.current || currentLength >= MAX_USERS) return;

    isLoadingRef.current = true;
    setLoading(true);

    api.list({ start: currentLength, count: 3 })
      .then(({ items }) => {
        setUsers((prev) => {
          // Filtramos por si la API envía un elemento repetido
          const existingIds = new Set(prev.map((u) => u.id));
          const newItems = items.filter((item) => !existingIds.has(item.id));
          return [...prev, ...newItems];
        });
      })
      .catch((err) => console.error("Error cargando usuarios:", err))
      .finally(() => {
        isLoadingRef.current = false;
        setLoading(false);
      });
  }, []);

  // Intersection Observer para scroll infinito
  useEffect(() => {
    const target = scrollPointerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [handleLoadMore, users.length]);

  const hasMore = users.length < MAX_USERS;

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <small>{users.length} usuarios de {MAX_USERS.toLocaleString()}</small>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
        {loading && <Skeleton count={3} />}
      </ul>

      {hasMore && <div ref={scrollPointerRef} style={{ height: "10px" }} />}

      <button
        onClick={handleLoadMore}
        type="button"
        disabled={loading || !hasMore}
      >
        {!hasMore ? "No hay más usuarios" : loading ? "Cargando..." : "Cargar más"}
      </button>
    </main>
  );
}

export default App;