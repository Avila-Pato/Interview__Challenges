"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pokemon } from "./types";
import pokemonService from "./api";

export default function Page() {
  // const { id, name, image } = pokemon;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await pokemonService.random();
        setPokemon(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          {pokemon.image && (
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={200}
              height={200}
            />
          )}
        </div>
      )}
    </div>
  );
}
