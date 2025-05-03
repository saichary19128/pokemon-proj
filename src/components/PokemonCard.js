import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <h2>{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
      <p>
        Types:{" "}
        {pokemon.types.map((type) => (
          <span key={type.type.name}>{type.type.name} </span>
        ))}
      </p>
    </div>
  );
};

export default PokemonCard;
