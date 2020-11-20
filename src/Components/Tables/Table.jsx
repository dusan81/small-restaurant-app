import React, { useEffect, useState } from 'react';
import { Guests } from './Guests';
import './Table.css'

export function Table(props) {

    const { 
        table,
        ordered, 
        guestWhoOrders,
        removeOrderedItem, 
        handleGuestWhoOrders, 
        handleCloseOrder,
        handlePayBill, 
        menuItemNum 
    } = props;

    const [tableMessage, setTableMessage] = useState('');

    const { id } = table;

    const orderIsClosed = ordered.some(order => order.tableID === id);

    const tableKeysArr = Object.keys(table);

    const allGuestsArr = tableKeysArr.reduce((acc, key) => 
        key.includes('guest') ? [...acc, table[key]] : acc
    , []);

    const tableTotal = allGuestsArr.reduce((acc, guest) => 
        guest.guestTotal(guest.order) + acc
    , 0);

    const handleMinMessage = () => {
        if (tableTotal >= 200) return;
        setTableMessage('Minimum table total is 200. Please enter more orders.')
    };

    const handleCloseOrderFirst = () => {
        if (tableMessage) setTableMessage('');
        if (orderIsClosed) return;
        else setTableMessage('You must close the table orders first!')
    };

    useEffect(()=> setTableMessage(''), [menuItemNum, orderIsClosed])

    return (
        <div className='table'> 
            <h2>Table {id}</h2>
            <Guests 
                    guests={allGuestsArr}
                    tableID={id}
                    guestWhoOrders={guestWhoOrders}
                    handleGuestWhoOrders={handleGuestWhoOrders}
                    removeOrderedItem={removeOrderedItem}
                    orderIsClosed={orderIsClosed}
            />
            <p className='message'>{tableMessage}</p>
            <button onClick={() => {
                handleCloseOrder(id, tableTotal);
                handleMinMessage()}}
            >
                {orderIsClosed ? 'Re-open orders' : 'Close orders'}
            </button>
            <button 
                onClick={() => {
                    handleCloseOrderFirst();
                    handlePayBill(id)
                }}
            >
                Pay
            </button>
            <p>Table total: {tableTotal}</p>
        </div>
    )
}
