import React, { useContext, useState, useEffect } from "react";
import { pokeContext } from "../../../../context/pokeContext";
import Card from "./Card";
import axios from "axios";

const ListaPokemon = () => {
  const { pokemons } = useContext(pokeContext);
  const [pokemonSearched, setPokemonSearched] = useState([]);

  // Limpia el estado al entrar a la página
  useEffect(() => {setPokemonSearched([]);}, []);

  const renderSearchedCard = () =>
    pokemonSearched.map((pokemon) => (
      <Card
        data={{
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
        }}
        key={pokemon.id} // Usamos el ID como key
      />
    ));

  useEffect(() => {
    const getPokemonBySearch = async () => {
      if (pokemons.length > 0) {
        const input = pokemons[pokemons.length - 1].toLowerCase();

        const isNumeric = !isNaN(input);
        const pokemonToSearch = isNumeric ? parseInt(input, 10) : input;

        const isAlreadySearched = pokemonSearched.some(
          (pokemon) =>
            pokemon.id === pokemonToSearch || pokemon.name.toLowerCase() === pokemonToSearch
        );

        if (isAlreadySearched) {
          alert("¡Este Pokémon ya está pintado!");
        } else {
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
            alert("No se encontró. Verifica el nombre o ID.");
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
