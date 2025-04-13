import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './component/search-bar/SearchBar'
import GridItems from './component/items/GridItems'
import { products } from './items.js'
import CrudBar from './component/crud-bar/CrudBar'
import ModalDialog from './component/modal-dialog/ModalDialog'

function App() {
  return (
    <>
      <header className='header-container'>
        <nav className='navbar'>
          <SearchBar/>
        </nav>
      </header>
      <div className='items-content'>
        <GridItems items={products}/>
      </div>
      <footer className='navbar-bottom'>
        <CrudBar/>
      </footer>
    </>
  )
}

export default App;