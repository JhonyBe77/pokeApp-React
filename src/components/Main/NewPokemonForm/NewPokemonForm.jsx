import React, { useState, useContext } from "react";
import { pokeContext } from "../../../context/pokeContext";
import Card from "../Home/ListaPokemon/Card";
import { v4 as uuidv4 } from "uuid";

const NewPokemonForm = () => {
  const { pokemonsCreated, updatePokemonsCreated } = useContext(pokeContext);

  const pokemons = Array.isArray(pokemonsCreated) ? pokemonsCreated : [];

  const [formValues, setFormValues] = useState({
    nombre: '',
    img_url: '',
    tipo1: '',
    tipo2: '',
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.nombre || !formValues.img_url || !formValues.tipo1) {
      alert("Completa todos los campos obligatorios.");
      return;
    }
    addPokemon({ ...formValues, id: uuidv4() });
    setFormValues({
      nombre: '',
      img_url: '',
      tipo1: '',
      tipo2: '',
    });
  };

  const addPokemon = (newPokemon) => {
    updatePokemonsCreated((prevPokemons) => (Array.isArray(prevPokemons) ? [...prevPokemons, newPokemon] : [newPokemon]));
  };

  const renderCreatedCards = () => {
    return pokemons.map((pokemon) => (
      <Card data={pokemon} key={pokemon.id} />
    ));
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Laboratorio</h2>
          <input type="text" name="nombre" onChange={handleChange} placeholder="Nombre" value={formValues.nombre} />
          <input type="text" name="img_url" onChange={handleChange} placeholder="URL de la imagen" value={formValues.img_url} />
          <input type="text" name="tipo1" onChange={handleChange} placeholder="Tipo 1" value={formValues.tipo1} />
          <input type="text" name="tipo2" onChange={handleChange} placeholder="Tipo 2" value={formValues.tipo2} />
          <button type="submit">Crear Pokemon</button>
        </form>
      </section>
      <section id="newPokemonsRender">
        {renderCreatedCards()}
      </section>
    </>
  );
};

export default NewPokemonForm;
