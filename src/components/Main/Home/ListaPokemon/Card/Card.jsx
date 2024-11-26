import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const { name, url } = data;

  if (!name || !url) {
    return null; 
  }

  const id = url.split("/").slice(-2, -1)[0];
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const formattedId = id.padStart(3, "0");
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <article className="card">
      <h5>#{formattedId}</h5>
      <img src={imageUrl} alt={name} />
      <div>
        <h4>{formattedName}</h4>
      </div>
    </article>
  );
};

export default Card;
