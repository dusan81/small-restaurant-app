import React, { useState } from 'react';
import { Menu } from './Components/Menu/Menu';
import { Tables } from './Components/Tables/Tables';
import { Bills } from './Components/Bill/Bills';
import { table, guest } from './data';
import './RestaurantApp.css';

function RestaurantApp() {

    // eslint-disable-next-line no-unused-vars
    const [guestCount, setGuestCount] = useState(4);
    

    // eslint-disable-next-line no-unused-vars
    const [tablesCount, setTablesCount] = useState(4);

    const guestsArr = Array.from({length: guestCount}, (v, i) => (
         {
             ...guest,
            id: i + 1,
            guestTotal(order) {
                if (order.length > 0) {
                    const orderSum = order.reduce((acc, item) => 
                        acc + item.price
                    , 0);
                    return orderSum;
                }
                else return 0;
            }
        }
    ));

    const tableWithGuests = guestsArr.reduce((acc, guest) => (
        {
            ...acc, 
            ...table, 
            [`guest_${guest.id}`]: guest
        }
    ), {});

    const initialTablesArr = Array.from({length: tablesCount}, (v, i) => (
        {...tableWithGuests, id: i + 1}
    ));

    const [tables, setTables] = useState(initialTablesArr);

    const [guestWhoOrders, setGuestWhoOrders] = useState({tableID: 0, guestID: 0});

    const { tableID, guestID } = guestWhoOrders;

    const [billStatus, setBillStatus] = useState({ordered: [], paid: []});

    const [menuItemNum, setMenuItemNum] = useState(0);

    const dateTime = new Date().toLocaleString('en-US', {hour12: false});
    

    const handleGuestWhoOrders = (tableID, guestID) => {
        setGuestWhoOrders({tableID, guestID});
        setMenuItemNum(prevMenuNum => prevMenuNum + 1);
    };

    const addOrderedItem = item => {
        if (!tableID && !guestID) return;
        setTables(prevTables => {
            const addItemToTable = prevTables.map(prevTable => {
                if (prevTable.id === tableID) {
                    const prevGuest = prevTable[`guest_${guestID}`];
                    const addOrderToGuest = {...prevGuest, order: [...prevGuest.order, item]}
                    return {...prevTable, [`guest_${guestID}`]: addOrderToGuest};
                }
                else return prevTable;
            })           
            return addItemToTable;
        })
        setMenuItemNum(prevMenuNum => prevMenuNum + 1);
    };

    const removeOrderedItem = (tableID, guestID, index) => {
        setTables(prevTables => {
            const removeItemFromTable = prevTables.map(prevTable => {
                if (prevTable.id === tableID) {
                    const prevGuest = prevTable[`guest_${guestID}`];
                    const removeItemFromGuest = prevGuest.order.filter((item, i) => index !== i);
                    const removedItemFromGuest = {...prevGuest, order: removeItemFromGuest};
                    return {...prevTable,  [`guest_${guestID}`]: removedItemFromGuest};
                }
                else return prevTable;
            })
            return removeItemFromTable;
        })
    }

    const handleCloseOrder = (tableID, tableTotal) => {
        if (tableTotal < 200) return;
        const newBill = {tableID, tableTotal, time: dateTime}    
        setBillStatus(prevBillStatus => {
            const { ordered } = prevBillStatus;
            if (ordered.some(order => order.tableID === tableID)) {
                const removeBill = ordered.filter(prevBill => 
                    prevBill.tableID !== tableID
                );
                return {...prevBillStatus, ordered: removeBill};
            } 
            else return {...prevBillStatus, ordered: [...ordered, newBill]}
        }) 
        setGuestWhoOrders({tableID: 0, guestID: 0})
    };

    const handlePayBill = tableID => {
        if (!billStatus.ordered.some(order => order.tableID === tableID)) return;
        setBillStatus(prevBillStatus => {
            const { ordered, paid } = prevBillStatus;
            const removedFromOrder = ordered.filter(order => order.tableID !== tableID);
            const paidBill = ordered.reduce((acc, order) => 
                order.tableID === tableID ? {...order, time: dateTime} : acc 
            ,{});
            return {
                ...prevBillStatus,
                ordered: removedFromOrder,
                paid: [...paid, paidBill]
            }
        });
        setTables(prevTables => prevTables.reduce((acc, prevTable) => 
            prevTable.id === tableID ? [...acc, {...tableWithGuests, id: tableID}] : [...acc, prevTable], [])
        );
    };

    return (
        <main className="app">
            <header className="app-header">
                <h1>My Restaurant App</h1>
            </header>
            <section className='all-wrap'>
                <Menu addOrderedItem={addOrderedItem}/>
                <Tables 
                    tables={tables}
                    ordered={billStatus.ordered}
                    guestWhoOrders={guestWhoOrders}
                    handleGuestWhoOrders={handleGuestWhoOrders}
                    removeOrderedItem={removeOrderedItem}
                    handleCloseOrder={handleCloseOrder}
                    handlePayBill={handlePayBill}
                    menuItemNum={menuItemNum}
                />
                <Bills billStatus={billStatus} />
            </section>
        </main>
    );
}

export default RestaurantApp;
