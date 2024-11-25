import React, { useContext, useState, useEffect } from "react";
import { pokeContext } from "../../../../context/pokeContext";
import Card from "./Card";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ListaPokemon = () => {
  const { pokemons } = useContext(pokeContext);
  const [pokemonSearched, setPokemonSearched] = useState([]);

  const renderSearchedCard = () =>
    pokemonSearched.map((pokemon) => (
      <Card
        data={{
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
        }}
        key={uuidv4()}
      />
    ));

  useEffect(() => {
    const getPokemonBySearch = async () => {
      if (pokemons.length > 0) {
        const pokemonToSearch = pokemons[pokemons.length - 1].toLowerCase();
        
        // Verificar si el Pokémon ya existe en la lista
        const isAlreadySearched = pokemonSearched.some(
          (pokemon) => pokemon.name.toLowerCase() === pokemonToSearch
        );

        if (!isAlreadySearched) {
          try {
            const resp = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${pokemonToSearch}`
            );
            const pokemonData = {
              name: resp.data.name,
              id: resp.data.id,
            };
            setPokemonSearched((prev) => [...prev, pokemonData]);
          } catch (err) {
            console.error("No se encontró el Pokémon:", err);
          }
        }
      }
    };

    if (pokemons.length > pokemonSearched.length) {
      getPokemonBySearch();
    }
  }, [pokemons]);

  return (
    <section className="pokemon-list">
      {renderSearchedCard()}
    </section>
  );
};

export default ListaPokemon;
