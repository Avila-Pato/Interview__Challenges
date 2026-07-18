"use client";
import type {Pokemon} from "./types";

import {useState} from "react";

import {POKEMONS} from "./constants";
import PokemonCard from "./PokemonCard";

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);

  const totalMoney = cart.reduce((total, pokemons) => total + pokemons.price, 0);


  return (
    <>
      <nav>
        <input className="nes-input" id="name_field" placeholder="Charmander" type="text" />
      </nav>
      <section style={styles.section}>
        {POKEMONS.map((pokemon) => {
          const isInCart = (id: string | number) => cart.some((p) => p.id === id);

          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isInCart={isInCart}
              onAdd={() => setCart((prev) => {
                if (prev.some((p) => p.id === pokemon.id)) {
                  return prev;
                }
                return [...prev, pokemon];
              })}
              onRemove={() => setCart((prev) => prev.filter((p) => p.id !== pokemon.id))}
            />
          );
        })}
          <aside>
        <button className="nes-btn is-primary"> tienes {cart.length}</button>
        <button className="nes-btn is-primary"> total ${totalMoney}</button>
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
  },
};