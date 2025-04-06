import React from 'react';
import './GridItems.css';

const GridItems = ({ items }) => {
  return (
    <div className='grid-items'>
        {items.map((item) => (
            <div 
                key={item.id} 
                className='item'
            >
                <b>{item.id}. {item.name}</b>
                <span>{item.priceUSD}$</span>
            </div>
        ))}
    </div>
  );
}

export default GridItems;