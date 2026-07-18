"use client";
import { Heart } from "lucide-react";
import { POKEMONS } from "./constants";
import type { Pokemon } from "./types";
import { useEffect, useEffectEvent, useState } from "react";

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<Pokemon[]>(POKEMONS);
  const [favories, setFavories] = useState<Pokemon[]>([]);
  const [mounted, setMounted] = useState(true);

  //persistimos favoritos
  useEffect(() => {
    const favorites = localStorage.getItem("favorites");

    if (favorites) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavories(JSON.parse(favorites));
    }
    setMounted(false);
  }, []);

  useEffect(() => {
    if (!mounted) {
      localStorage.setItem("favorites", JSON.stringify(favories));
    }
  }, [favories, mounted]);

  const totalMoney = cart.reduce(
    (total, pokemons) => total + pokemons.price,
    0,
  );

  const addCart = (pokemon: Pokemon) => {
    const total = cart.reduce((total, pokemons) => total + pokemons.price, 0);

    if (total + pokemon.price >= 10) return; // Limitamos a $10
    if (cart.length >= 3) return; // Limitamos a 3
    if (cart.find((p) => p.id === pokemon.id)) return; // No permitimos duplicados

    setCart([...cart, pokemon]);
  };

  const inputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    const filtered = POKEMONS.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value),
    );

    setSearch(filtered);

  };

  
  const toggleFavories = (pokemon: Pokemon) => {
    const isAlreadyFavorite = favories.some((p) => p.id === pokemon.id);
    
    if (isAlreadyFavorite) {
      setFavories(favories.filter((p) => p.id !== pokemon.id));
    } else {
      setFavories([...favories, pokemon]);
    }
  };

  const isFavorite = (pokemon: Pokemon) => {
    return favories.some((p) => p.id === pokemon.id);
  };

  return (
    <>
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Charmander"
          type="text"
          onChange={inputSearch}
        />
      </nav>
      <section style={styles.section}>
        {search.map((pokemon) => (
          <article key={pokemon.id}>
            <figure>
              <img
                className="nes-container"
                src={pokemon.image}
                alt={pokemon.name}
              />
            </figure>
            <div>
              <p>
                {pokemon.name} (${pokemon.price})
              </p>
              <p>{pokemon.description}</p>
            </div>
            <div className="flex">
              <button className="nes-btn" onClick={() => addCart(pokemon)}>
                Agregar
              </button>
              <button
                  type="button"
                  onClick={() => toggleFavories(pokemon)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {/* CORRECCIÓN AQUÍ: Usamos el icono de Lucide con 'fill' dinámico */}
                  <Heart 
                    size={24} // Tamaño del icono
                    // El borde (stroke) siempre es negro para el estilo retro
                    stroke="black" 
                    // El relleno (fill) cambia: rojo si es favorito, transparente si no
                    fill={isFavorite(pokemon) ? "#e74c3c" : "transparent"} 
                    style={{ transition: 'fill 0.2s ease' }} // Pequeña animación opcional
                  />
                </button>
            </div>
          </article>
        ))}
        <aside style={styles.aside}>
          <button className="nes-btn is-primary">
            {cart.length} items (total ${totalMoney})
          </button>
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
  aside: {
    padding: "1rem",
    display: "block",
  },
};
