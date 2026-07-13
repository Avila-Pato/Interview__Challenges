"use client";

import { CSSProperties, useEffect, useState } from "react";

import api from "./api";
import { Product } from "./type";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      api.search(query).then(setProducts).finally(() => setLoading(false));
  }, [query]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="search"
        onChange={handleSearch}
      />
      <ul>
        {loading ? (
          <li style={styles.loading}>Cargando...</li>
        ) : (
          products.map((product) => (
            <li key={product.id}>
              <small style={styles.sales}>
                {product && product.price <= 100 ? "Sales" : ""}
              </small>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

export default App;

const styles: Record<string, CSSProperties> = {
  sales: {
    color: "green",
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  loading: {
    color: "red!",
    fontSize: "1.2em",
    fontWeight: "bold",
  },
};
