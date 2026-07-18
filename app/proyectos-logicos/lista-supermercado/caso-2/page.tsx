"use client";
import type {Item} from "./types";

import {useEffect, useRef, useState} from "react";

import api from "./api";


interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const useRefInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (useRefInput.current) {
      useRefInput.current.focus();
    }
  }, []);

  function handleToggle(id: Item["id"]) {
    setItems((items) => {
      return items.map((item) => {
        if (item.id === id) {
          return {...item, completed: !item.completed};
        }
        return item;
      });
    })
  }

  function handleAdd(event: React.SubmitEvent<Form>) {
    event.preventDefault();

    // creamos un formData a partir del formulario
    const formData = new FormData(event.currentTarget);
    // obtenemos el valor del input text
    const textValue = formData.get("text") as string;
    //validacion simple:
    if (!textValue || textValue.trim().length === 0) return;

    setItems((items) =>
      items.concat({
        id: Date.now(),
        completed: false,
        text: textValue.trim(),
      } as Item),
    );

    event.currentTarget.reset();
  }

  function handleRemove(id: Item["id"]) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  useEffect(() => {
    api
      .list()
      .then(setItems)
      .finally(() => toggleLoading(false));
  }, []);

  if (isLoading) return "Loading...";

  return (
    <main className={styles.main}>
      <h1>Supermarket list</h1>
      <form onSubmit={handleAdd}>
        <input ref={useRefInput} name="text" type="text"  required/>
        <button>Add</button>
      </form>
      <ul>
        {items?.map((item) => (
          <li
            key={item.id}
            className={item.completed ? styles.completed : ""}
            onClick={() => handleToggle(item.id)}
          >
            {item.text} <button onClick={() => handleRemove(item.id)}>[X]</button>
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
