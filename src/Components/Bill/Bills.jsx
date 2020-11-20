import React from 'react';
import { BillsOrdered } from './BillsOrdered';
import { BillsPaid } from './BillsPaid';
import './Bills.css'

export function Bills({ billStatus }) {

    const { ordered, paid } = billStatus;

    const earnings = paid.reduce((acc, paidBill) => acc + paidBill.tableTotal, 0);

    return (
        <aside>
            <h2>Bills</h2>
            <div className='bills-wrap'>
                <BillsOrdered ordered={ordered} />
                <BillsPaid paidBills={paid} />
            </div>
            <p style={{textAlign: 'right'}}>Total earnings: {earnings}</p>
        </aside>
    )
}
