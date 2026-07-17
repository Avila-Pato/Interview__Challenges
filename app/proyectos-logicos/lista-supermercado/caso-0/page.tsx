"use client";
import type { Item } from "./types";

import { useEffect, useRef, useState } from "react";

import api from "./api";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  },[])

  useEffect(() => {
    api.list().then(setItems);
  }, []);

  const EliminarProducto = (id: number) => {
    setItems((prev) => prev.filter((u) => u.id !== id));
  };

  const agregarProducto = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const text = new FormData(form).get("text") as string;

    console.log(text);

    setItems((prev) => [...prev]);
    const nuevoItem = await api.add(text);
    setItems((prev) => [...prev, nuevoItem]);
    setText("");
    form.reset();

  };

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={agregarProducto}>
        <input name="text" type="text" ref={inputRef} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.completed ? styles.completed : ""}>
            {item.text}{" "}
            <button onClick={() => EliminarProducto(item.id)}>[X]</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;

const styles = {
  main: "p-4",
  completed: "line-through",
};
