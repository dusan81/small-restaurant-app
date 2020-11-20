import React from 'react';
import { Bill } from './Bill';

export function BillsPaid({ paidBills }) {

    const paid = paidBills.map((paidBill, i) => 
        <li key={i}>
            <Bill 
                id={paidBill.tableID}
                time={paidBill.time}
                total={paidBill.tableTotal}
            />
        </li>
    );


    return (
        <div>
            <h3>Paid:</h3>
                <ul className='paid-ul'>
                    {paid}
                </ul>
        </div>
    )
}
