//This creates a simple SearchBar component with an input field.
import React from 'react';

function SearchBar({ onSearch }) {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };
/// This function is called whenever the input value changes
  return (
    <div>
      <input
        type="text"
        placeholder="Search expenses..."
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;