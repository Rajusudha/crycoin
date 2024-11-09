import React from 'react'
import './search.css'
import SearchIcon from '@mui/icons-material/Search'

function Search({search,setSearch}) {
    return (
        <div className="search-box">
          <SearchIcon sx={{ color: "var(--grey) !important" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </div>
      );
    }

export default Search