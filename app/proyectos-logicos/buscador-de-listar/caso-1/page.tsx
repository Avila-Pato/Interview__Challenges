/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import {useEffect, useState} from "react";

import api from "./api";
import { Product } from "./type";

type Sort = "asc" | "desc"; 

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
 

  // filtros sorted Products
  const [sort, setSort] = useState<Sort>("asc");

  useEffect(() => {
    const storedSort = localStorage.getItem("sort") as Sort | null;

    if(storedSort) {
      setSort(storedSort as Sort)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("sort", sort);
  }, [sort])
 
  // DEBE PERSISRTIR LOS FILTROS
     const sortedProduct = [...products].sort((a, b) => {
    if (sort === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  }, )
 

  useEffect(() => {
    api.search(query).then(setProducts).finally(() => setLoading(false));
  }, [query]);

 
  //Formater para mostrar el precio argentino 
  const formater = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }); 

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <ul>
        { loading ? (
          <li>Cargando...</li>
        ): (
        sortedProduct.map((product) => (
          <li key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {formater.format(product.price)}</span>
          </li>
        ))
        )}
      </ul>
    </main>
  );
}

export default App;