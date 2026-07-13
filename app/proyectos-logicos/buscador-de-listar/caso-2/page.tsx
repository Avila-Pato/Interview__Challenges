/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";

import api from "./api";
import { Product } from "./type";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  // guardar favoritos en el storage
  useEffect(() => {
    const storedFavorite = localStorage.getItem("favorites");

    if (storedFavorite) {
      setFavorites(JSON.parse(storedFavorite));
    }
  }, []);

  // Persistir los favoritos
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addProduct = (producto: Product) => {
    setFavorites((prev) => [...prev, producto]);
  };

  const removeProduct = (producto: Product) => {
    setFavorites((prev) => prev.filter((p) => p.id !== producto.id));

  };

  return (
    <main className="container w-full m-auto min-h-screen px-4">
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex">
        <ul className="flex-1 ">
          {products.map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
              <button onClick={() => addProduct(product)}>Agregar</button>
            </li>
          ))}
        </ul>
        {/* Fvoritos al lado de productos*/}
        <section className="flex w-64 bg-red-50">
          <h2>Favoritos</h2>
          <ul>
            {/* agregar productos favoritos al rpesionar boton de favorito*/}
            {favorites.map((product) => (
              <li key={product.id}>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <span>$ {product.price}</span>
                <button onClick={() => removeProduct(product)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <hr />
      {query && <Recommended />}
    </main>
  );
}

function Recommended() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.search().then(setProducts);
  }, []);

  return (
    <main>
      <h1>Productos recomendados</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
