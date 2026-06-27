"use client";
import {useCallback, useEffect, useRef, useState} from "react";
import { User } from "./types/type";
import api, { MAX_USERS } from "./api/api";


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollPointerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  const handleLoadMore = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    api.list({ start: users.length, count: 8 }).then(({ items }) => {
      setUsers((prev) => [...prev, ...items]);
      setLoading(false);
      loadingRef.current = false;
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


function userSkeleton(index: number) {
    return (
      <li key={index} className="flex-1 space-y-2">
        <div className="h-5 w-1/3 bg-gray-200 animate-pulse"></div>
        <div className="h-5 w-1/3 bg-gray-200 animate-pulse"></div>
      </li>
    );
  }  
  

  return (
    <main>
      <h1>Directorio de usuarios</h1>
      <ul>
        {loading ? 
          Array.from({ length: 8}).map((_, index) => (
            userSkeleton(index)
          ))
        :
        users.map((user) => (
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