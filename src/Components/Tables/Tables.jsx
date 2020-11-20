import React from 'react';
import { Table } from './Table';
import './Tables.css'

export function Tables(props) {

    const {
        tables,
        ...otherProps
    } = props;

    const allTables = tables?.map(table => 
        <li key={table.id}>
            <Table 
                table={table}
                {...otherProps}             
            />
        </li>
    );

    return (
        <ul className='tables'>
            {allTables}
        </ul>
    )
}
