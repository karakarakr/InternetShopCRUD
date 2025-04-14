import './App.css'
import SearchBar from './component/search-bar/SearchBar'
import GridItems from './component/items/GridItems'
import CrudBar from './component/crud-bar/CrudBar'
import { getProducts } from './items';
import { newAddedItemList, newTruncItemList } from './utils/crud';
import { useState, useMemo } from 'react';

function App() {
  const [products, setProducts] = useState(getProducts());
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ field: '', direction: '' });

  const addNewProduct = (item) => {
    setProducts(prev => newAddedItemList(prev, item));
  };

  const deleteProduct = (id) => {
    setProducts(prev => newTruncItemList(prev, id));
  };

  const changeProduct = (updatedItem) => {
    setProducts(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortConfig.field) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [products, sortConfig]);

  const filteredProducts = sortedProducts.filter(product => {
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
        <GridItems items={filteredProducts} changeProduct={changeProduct} />
      </div>
      <footer className='navbar-bottom'>
        <CrudBar
          addItem={addNewProduct}
          deleteItem={deleteProduct}
          changeItem={changeProduct}
          items={products}
          setSortConfig={setSortConfig}
        />
      </footer>
    </>
  )
}

export default App;