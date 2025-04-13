import React, { useState } from 'react';
import './GridItems.css';
import ModalDialog from '../modal-dialog/ModalDialog';

const ItemModalDialog = ({ item, onClick }) => {
  return (
    <ModalDialog onClick={onClick}>
      <b>{item.id}. {item.name}</b>
      <p>Description: {item.description}</p>
      <p>Price: ${item.priceUSD}</p>
    </ModalDialog>
  );
};

const GridItems = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div className='grid-items'>
        {items.map((item) => (
          <div
            key={item.id}
            className='item'
            onClick={() => handleItemClick(item)}
          >
            <b>{item.id}. {item.name}</b>
            <span>{item.priceUSD}$</span>
          </div>
        ))}
      </div>

      {selectedItem && (
        <ItemModalDialog
          item={selectedItem}
          onClick={handleCloseModal}
        />
      )}
    </>
  );
};

export default GridItems;
