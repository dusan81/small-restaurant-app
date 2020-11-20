import React from 'react';
import { Bill } from './Bill';

export function BillsOrdered({ ordered }) {

    const currentOrders = ordered.map(order => 
        <li key={order.tableID}>
            <Bill 
                id={order.tableID}
                time={order.time}
                total={order.tableTotal}
            />
        </li>
    );

    return (
        <div>
            <h3>Ordered:</h3>
            <ul className='ordered-ul'>
                {currentOrders}
            </ul>
        </div>
    )
}
