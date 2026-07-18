import type {Pokemon} from "./types";

type PokemonCardProps = {
  pokemon: Pokemon;
  isInCart: (id: number | string) => boolean;
  onAdd: (pokemon: Pokemon) => void;
  onRemove: (pokemon: Pokemon) => void;
};

export default function PokemonCard({pokemon, onAdd, onRemove, isInCart}: PokemonCardProps) {
  return (
    <article key={pokemon.id}>
      <img className="nes-container" src={pokemon.image} />
      <div>
        <p>{pokemon.name}</p>
        <p>{pokemon.description}</p>
      </div>
     <button 
        type="button" 
        className={`nes-btn ${isInCart(pokemon.id) ? "is-error" : "is-primary"}`} 
        onClick={() => isInCart(pokemon.id) ? onRemove(pokemon) : onAdd(pokemon)}
      >
        {isInCart(pokemon.id) ? "Quitar" : "Agregar"}
      </button>
    </article>
  );
}