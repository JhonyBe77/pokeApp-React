import React, { useContext, useState } from "react";
import { pokeContext } from "../../../../context/pokeContext";

const Search = () => {
  const { updatePokemons } = useContext(pokeContext);
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePokemons(value);
    setValue("");
  };

  return (
    <div>
      <form id="searchOne" onSubmit={handleSubmit}>
        <div>
          <input type="text" name="nombre" value={value} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit" id="round-btn">Buscar</button>
        </div>
      </form>
    </div>
  );
};

export default Search;
