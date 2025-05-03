import React from "react";

const SearchBar = ({ searchTerm, onSearchChange, onTypeFilter, selectedType }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <select value={selectedType} onChange={onTypeFilter}>
        <option value="all">All Types</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
      </select>
    </div>
  );
};

export default SearchBar;
