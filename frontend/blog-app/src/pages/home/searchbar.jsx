import React, { useState, useEffect } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../utils/axiosInstance"; // Update with correct path to your axios instance

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for storing search results

  // Function to fetch stories based on search query
  const fetchSearchResults = async (query) => {
    if (query.trim() === "") {
      setSearchResults([]); // Clear results if query is empty
      return;
    }

    try {
      const response = await axiosInstance.get("/search", {
        params: { query }, // Send search query as a parameter
      });
      setSearchResults(response.data.stories || []); // Assuming the API returns an array of stories
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Debouncing the search input (to prevent calling the API on every keystroke)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSearchResults(searchQuery); // Trigger the search after 500ms delay
    }, 500);

    return () => clearTimeout(debounceTimer); // Clean up previous timeout on re-render
  }, [searchQuery]); // Re-run effect when searchQuery changes

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery as the user types
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
      />
      <IconButton onClick={() => fetchSearchResults(searchQuery)} aria-label="search">
        <SearchIcon />
      </IconButton>

      {/* Display the search results */}
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result._id}>
              <h3>{result.title}</h3>
              <p>{result.story}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
