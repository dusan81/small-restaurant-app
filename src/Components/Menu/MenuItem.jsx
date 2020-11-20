import React from 'react';

export function MenuItem({ item, addOrderedItem }) {


    return (
        <div 
            className='menu-item'
            onClick={() => addOrderedItem(item)}
        >
            {item.name}&ensp;{item.price}
        </div>
    )
}
