import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokeDetails = await fetch(pokemon.url);
            const pokeDetailsJson = await pokeDetails.json();
            return pokeDetailsJson;
          })
        );
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokémon data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilter = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokémon Explorer</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onTypeFilter={handleTypeFilter}
          selectedType={selectedType}
        />
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredPokemons.length === 0 ? (
          <p>No Pokémon found</p>
        ) : (
          <PokemonList pokemons={filteredPokemons} />
        )}
      </main>
    </div>
  );
};

export default App;

