import React from 'react';
import './Guest.css'

export function Guest(props) {

    const { 
        guest, 
        tableID, 
        guestWhoOrders, 
        handleGuestWhoOrders,
        removeOrderedItem, 
        orderIsClosed 
    } = props;

    const { id, order } = guest;

    const allOrders = order.map((order, i) => 
        <li key={i} className={`orders ${orderIsClosed ? 'orders-closed' : ''}`}>
            <span onClick={() => removeOrderedItem(tableID, id, i)}>&#x2717;</span>
            &nbsp;{order.name}
        </li>
    );

    const isActive = guestWhoOrders.tableID === tableID && guestWhoOrders.guestID === id;

    return (
        <div className='guest'>
            <p className={`guest-id ${orderIsClosed ? 'guest-closed' : ''}`}>
                Guest {id}
            </p>
            <button 
                className={`order-btn ${isActive ? 'btn-active' : ''} ${orderIsClosed ? 'btn-closed' : ''}`}
                onClick={() => {
                handleGuestWhoOrders(tableID, id)}} 
            >
                Order
            </button>
            <ul>
                {allOrders}
            </ul>
        </div>
    )
}
