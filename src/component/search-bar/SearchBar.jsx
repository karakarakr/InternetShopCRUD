import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        onSearch(input);
    };

    return (
        <div className='search-bar'>
            <input 
                className='search-input' 
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className='search-btn' onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
