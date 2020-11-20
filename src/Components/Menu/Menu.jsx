import React, { useState} from 'react';
import { MenuItemsList } from './MenuItemsList';
import { menu } from '../../data';
import './Menu.css';

export function Menu({ addOrderedItem }) {

    const [allMenu, setAllMenu] = useState(menu);

    const menuArr = Object.keys(menu);

    const menuCategoryList = menuArr.map((category, i) =>
        <li key={i}>
            <h3>{category.toUpperCase()}</h3>
            <MenuItemsList 
                menuCategory={menu[category]}
                addOrderedItem={addOrderedItem}
            />
        </li>
    );

    return (
        <div className='menu'>
            <h2>Menu</h2>
            <ol>
                {menuCategoryList}
            </ol>
        </div>
    )
}
