import React from 'react';
import { MenuItem } from './MenuItem';

export function MenuItemsList({ menuCategory, addOrderedItem }) {

    const itemsList = menuCategory.map((item, i) => 
        <li key={i}>
            <MenuItem 
                item={item}
                addOrderedItem={addOrderedItem}
            />
        </li>
    );

    return (
        <ul>
            {itemsList}
        </ul>
    )
}
