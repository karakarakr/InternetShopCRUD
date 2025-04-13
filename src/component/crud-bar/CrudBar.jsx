import React from 'react';
import { useState } from 'react';
import ModalDialog from '../modal-dialog/ModalDialog';
import './CrudBar.css';


const ChangeModalDialog = ({ onClick, changeItem, items }) => {
    const [id, setId] = useState('');
    const [item, setItem] = useState(null);

    const handleLoad = () => {
        const found = items.find(i => i.id === Number(id));
        setItem(found ? { ...found } : null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prev => ({
            ...prev,
            [name]: name === 'priceUSD' || name === 'count' ? +value : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item) {
            changeItem(item);
            onClick();
        }
    };

    return (
        <ModalDialog onClick={onClick}>
            <form className='modal-form' onSubmit={handleSubmit}>
                <label>Enter ID:</label>
                <input 
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="button" onClick={handleLoad}>
                    Load
                </button>

                {item && (
                    <>
                        <label>Name:</label>
                        <input
                            name="name"
                            type="text"
                            value={item.name}
                            onChange={handleChange}
                        />
                        <label>Description:</label>
                        <input
                            name="description"
                            type="text"
                            value={item.description}
                            onChange={handleChange}
                        />
                        <label>Price USD:</label>
                        <input
                            name="priceUSD"
                            type="number"
                            value={item.priceUSD}
                            onChange={handleChange}
                        />
                        <label>Count:</label>
                        <input
                            name="count"
                            type="number"
                            value={item.count}
                            onChange={handleChange}
                        />
                        <label>Category:</label>
                        <input
                            name="category"
                            type="text"
                            value={item.category}
                            onChange={handleChange}
                        />
                        <button type="submit">Save Changes</button>
                    </>
                )}
            </form>
        </ModalDialog>
    );
};

const DeleteModalDialog = ({ onClick, deleteItem }) => {
    const [id, setId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id.trim() !== '') {
            deleteItem(Number(id));
            onClick();
        }
    };

    return (
        <ModalDialog onClick={onClick}>
            <form className='modal-form' onSubmit={handleSubmit}>
                <label htmlFor="delete-id">Enter ID to delete:</label>
                <input 
                    type="number" 
                    id="delete-id" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                />
                <button type="submit">Delete</button>
            </form>
        </ModalDialog>
    );
};

const AddModalDialog = ({ onClick, addItem }) => {
    const [item, setItem] = useState({
        name: 'None',
        description: 'None',
        priceUSD: 0,
        count: 0,
        category: 'rifle'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prev => ({
            ...prev,
            [name]: name === 'priceUSD' || name === 'count' ? +value : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(item);
        onClick();
    };

    return (
      <ModalDialog onClick={onClick}>
        <form className='modal-form' onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input 
                name="name"
                type="text" 
                value={item.name}
                onChange={handleChange}
            />
            <label htmlFor="description">Description: </label>
            <input 
                name="description"
                type="text" 
                value={item.description}
                onChange={handleChange}
            />
            <label htmlFor="priceUSD">Price USD: </label>
            <input 
                name="priceUSD"
                type="number" 
                value={item.priceUSD}
                onChange={handleChange}
            />
            <label htmlFor="count">Count: </label>
            <input 
                name="count"
                type="number" 
                value={item.count}
                onChange={handleChange}
            />
            <label htmlFor="category">Category: </label>
            <input 
                name="category"
                type="text" 
                value={item.category}
                onChange={(e) =>
                    setItem(prev => ({
                        ...prev,
                        category: e.target.value.toLowerCase()
                    }))
                }
            />
            <button type="submit">Add</button>
        </form>
      </ModalDialog>
    );
};

const CrudBar = ({ addItem, deleteItem, changeItem, items }) => {
    const [openedAddDialog, setOpenedAddDialog] = useState(false);
    const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false);
    const [openedChangeDialog, setOpenedChangeDialog] = useState(false);

    const openAddDialog = () => setOpenedAddDialog(true);
    const openDeleteDialog = () => setOpenedDeleteDialog(true);
    const openChangeDialog = () => setOpenedChangeDialog(true);

    return (
        <>
            <button className='add-btn' onClick={openAddDialog}>Add</button>
            <button className='change-btn' onClick={openChangeDialog}>Change</button>
            <button className='delete-btn' onClick={openDeleteDialog}>Remove</button>

            {openedAddDialog && (
                <AddModalDialog
                    onClick={() => setOpenedAddDialog(false)}
                    addItem={addItem}
                />
            )}

            {openedDeleteDialog && (
                <DeleteModalDialog
                    onClick={() => setOpenedDeleteDialog(false)}
                    deleteItem={deleteItem}
                />
            )}

            {openedChangeDialog && (
                <ChangeModalDialog
                    onClick={() => setOpenedChangeDialog(false)}
                    changeItem={changeItem}
                    items={items}
                />
            )}
        </>
    );
};

export default CrudBar;