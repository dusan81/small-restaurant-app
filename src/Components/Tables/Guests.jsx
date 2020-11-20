import React from 'react'
import { Guest } from './Guest';
import './Guests.css'

export function Guests(props) {

    const {
        guests,
        ...otherProps
    } = props;

    const tableGuests = guests?.map(guest => 
        <li key={guest.id}>
            <Guest 
                guest={guest}
                {...otherProps}
            />
        </li>
    );

    return (
        <ul className='guests-ul'>
            {tableGuests}
        </ul>
    )
}
