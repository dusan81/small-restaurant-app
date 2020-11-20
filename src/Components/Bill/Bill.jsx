import React from 'react';

export function Bill({ id, time, total}) {

    return (
        <div>
            <p>Table number: {id}</p>
            <p>Time: {time}</p>
            <p>Total: {total}</p>
        </div>
    )
}
