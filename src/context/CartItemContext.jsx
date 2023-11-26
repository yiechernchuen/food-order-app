/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

//Create context
const CartItemContext = createContext([]);

//Provide context
export function CartItemContextProvider({ children }) {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) ?? []);
    const [orderedItems, setOrderedItems] = useState(JSON.parse(localStorage.getItem('orderedItems')) ?? []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('orderedItems', JSON.stringify(orderedItems));
    }, [cartItems, orderedItems]);

    function handleAddCartItem(name, price, itemCode) {
        const hasDuplicateItem = cartItems.some((item) => item.itemCode === itemCode);
        if (hasDuplicateItem) return;
        setCartItems((prevCartItems) => [...prevCartItems, { name, price, units: 1, itemCode }]);
    }

    function handleDeleteCartItem(itemCode) {
        const newCartList = cartItems.filter((item) => item.itemCode !== itemCode);
        setCartItems(newCartList);
    }

    function handleIncreaseCartItemUnit(itemCode) {
        const newCartItems = cartItems.map((item) => {
            if (item.itemCode === itemCode) return { ...item, units: item.units + 1 };
            return item;
        });
        setCartItems(newCartItems);
    }

    function handleDecreaseCartItemUnit(itemCode) {
        let newCartItems = [];
        cartItems.forEach((item) => {
            if (item.itemCode === itemCode) {
                if (item.units === 1) return;
                newCartItems.push({ ...item, units: item.units - 1 });
            } else {
                newCartItems.push(item);
            }
        });
        setCartItems(newCartItems);
    }

    function handleClearCart() {
        setCartItems([]);
    }

    function handleAddOrderItem() {
        setOrderedItems((prevOrderItem) => [...prevOrderItem, [uuidv4(), ...cartItems]]);
        setCartItems([]);
    }

    function handleDeleteOrderList(orderBatchId) {
        const newOrderedList = orderedItems.filter((orderBatch) => orderBatch[0] !== orderBatchId);
        setOrderedItems(newOrderedList);
    }

    const value = {
        cartItems,
        handleAddCartItem,
        handleIncreaseCartItemUnit,
        handleDecreaseCartItemUnit,
        handleClearCart,
        handleDeleteCartItem,
        handleAddOrderItem,
        orderedItems,
        handleDeleteOrderList,
    };
    return <CartItemContext.Provider value={value}>{children}</CartItemContext.Provider>;
}

//Use context
export function useCartItemContext() {
    return useContext(CartItemContext);
}
