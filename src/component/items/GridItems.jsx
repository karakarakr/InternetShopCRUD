import React, { useState } from 'react';
import './GridItems.css';
import ModalDialog from '../modal-dialog/ModalDialog';

const ItemModalDialog = ({ item, onClick, buyClick, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({
      ...prev,
      [name]: name === 'priceUSD' || name === 'count' ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    onSave(editedItem);
    setIsEditing(false);
  };

  return (
    <ModalDialog onClick={onClick}>
      {isEditing ? (
        <form className="modal-form">
          <label>Name:</label>
          <input name="name" value={editedItem.name} onChange={handleChange} />

          <label>Description:</label>
          <input name="description" value={editedItem.description} onChange={handleChange} />

          <label>Price (USD):</label>
          <input type="number" name="priceUSD" value={editedItem.priceUSD} onChange={handleChange} />

          <label>Count:</label>
          <input type="number" name="count" value={editedItem.count} onChange={handleChange} />

          <label>Category:</label>
          <input name="category" value={editedItem.category} onChange={handleChange} />

          <button type="button" onClick={handleSave}>Save</button>
        </form>
      ) : (
        <>
          <b>{item.id}. {item.name}</b>
          <p>Description: {item.description}</p>
          <p>Price: ${item.priceUSD}</p>
          <p>Count: {item.count}</p>
          <p>Category: {item.category}</p>
          <button onClick={buyClick}>Buy</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </ModalDialog>
  );
};

const NotEnoughItemDialog = ({ onClick }) => {
  return (
    <ModalDialog onClick={onClick}>
      <b>NOT Enough items!</b>
    </ModalDialog>
  );
};

const GridItems = ({ items, changeProduct }) => {
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

    const updatedItem = {
      ...selectedItem,
      count: selectedItem.count - 1
    };

    changeProduct(updatedItem); // update global state
    setSelectedItem(updatedItem); // reflect in modal
  };

  const handleSave = (updatedItem) => {
    changeProduct(updatedItem);
    setSelectedItem(updatedItem);
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
          buyClick={buyItem}
          onSave={handleSave}
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
