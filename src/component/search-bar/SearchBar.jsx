import React from 'react';
import './SearchBar.css'

const SearchBar = () => {
    return (
        <div className='search-bar'>
            <input 
                className='search-input' 
                type='text'
            />
            <button className='search-btn'>Search</button>
        </div>
    );
}

export default SearchBar;