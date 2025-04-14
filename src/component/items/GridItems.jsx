import React, { useState } from 'react';
import './GridItems.css';
import ModalDialog from '../modal-dialog/ModalDialog';

const ItemModalDialog = ({ item, onClick, buyClick }) => {
  return (
    <ModalDialog onClick={onClick}>
      <b>{item.id}. {item.name}</b>
      <p>Description: {item.description}</p>
      <p>Price: ${item.priceUSD}</p>
      <p>Count: {item.count}</p>
      <button onClick={buyClick}>Buy</button>
    </ModalDialog>
  );
};

const NotEnoughItemDialog = ({ item, onClick }) => {
  return (
    <ModalDialog onClick={onClick}>
      <b>NOT Enough items!</b>
    </ModalDialog>
  );
};

const GridItems = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogNotEnough, setDialogNotEnough] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const buyItem = () => {
    if (selectedItem.count <= 0) {
      setDialogNotEnough(true);
      return;
    }
    
    setSelectedItem({
      ...selectedItem, 
      count: selectedItem.count - 1
    });
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
          buyClick={() => buyItem()}
        />
      )}

      {dialogNotEnough && (
        <NotEnoughItemDialog
          onClick={() => setDialogNotEnough(false)}
        />
      )}
    </>
  );
};

export default GridItems;
