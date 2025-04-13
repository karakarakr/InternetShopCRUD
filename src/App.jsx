import './App.css'
import SearchBar from './component/search-bar/SearchBar'
import GridItems from './component/items/GridItems'
import CrudBar from './component/crud-bar/CrudBar'
import { getProducts } from './items';
import { newAddedItemList, newTruncItemList } from './utils/crud';
import { useState } from 'react';

function App() {
  const [products, setProducts] = useState(getProducts());
  const [searchQuery, setSearchQuery] = useState('');
  
  const addNewProduct = (item) => {
    setProducts(prev => newAddedItemList(prev, item));
  };

  const deleteProduct = (id) => {
    setProducts(prev => newTruncItemList(prev, id));
  };

  const changeProduct = (updatedItem) => {
    setProducts(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <header className='header-container'>
        <nav className='navbar'>
          <SearchBar onSearch={setSearchQuery} />
        </nav>
      </header>
      <div className='items-content'>
        <GridItems items={filteredProducts}/>
      </div>
      <footer className='navbar-bottom'>
        <CrudBar
          addItem={addNewProduct}
          deleteItem={deleteProduct}
          changeItem={changeProduct}
          items={products}
        />
      </footer>
    </>
  )
}

export default App;