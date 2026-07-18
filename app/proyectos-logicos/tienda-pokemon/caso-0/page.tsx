"use client";
import React, {useEffect, useState} from "react";

import api from "./api";
import {Pokemon} from "./types";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.list().then(setPokemons).finally(() => setLoading(false));
  }, []);

  const addTocart = (pokemon: Pokemon) => {
    if(cart.length >= 3) return // Limitamos a 3
    if(cart.find((p) => p.id === pokemon.id)) return // No permitimos duplicados

    setCart([...cart, pokemon]); // agregamos el pokemon
  }

  const totalMoney = cart.reduce((total, pokemons) => total + pokemons.price, 0);

  return (
    <>
      <section style={styles.section}>
        {loading ? (
          <p>Cargando...</p>
        ): (
          pokemons.map((pokemon) => (
            <article key={pokemon.id}>
              <img className="nes-container" src={pokemon.image} />
              <div>
                <p>{pokemon.name}</p>
                <p>{pokemon.description}</p>
              </div>
              <button className="nes-btn" onClick={() => addTocart(pokemon)}>
                Agregar
              </button>
            </article>
          ))
        ) }
         <aside>
        <button className="nes-btn is-primary"> {cart.length} items (total ${totalMoney})</button>
      </aside>
      </section>
     
    </>
  );
}

export default App;

const styles: Record<string, React.CSSProperties> = {
  section: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "1rem",
    padding: "1rem",
  }
}