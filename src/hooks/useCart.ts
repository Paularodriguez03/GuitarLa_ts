import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem, IdCart } from "../types/types";

function useCart() {
    const InitialState = (): CartItem[] => {
        const local = localStorage.getItem("cart")
        return local ? JSON.parse(localStorage.getItem("cart")!) : [];
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(InitialState);

    const maxItems = 5;
    const minItems = 1;

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const AddToCart = (item: Guitar) => {
        const itemExist = cart.findIndex(itemCart => itemCart.id === item.id);
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= maxItems) return;
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity += 1;
            setCart(updatedCart);
        } else {
            const newItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
        }
    }

    const RemoveToCart = (id: IdCart) => {
        setCart((prevCart) => prevCart.filter((item: CartItem) => item.id !== id));
    };

    const IncremetQuantity = (id: IdCart) => {
        const find = cart.find(item => item.id === id && item.quantity < maxItems);
        if (find) {
            find.quantity += 1;
            setCart([...cart]);
        }
    }

    const DecrementQuantity = (id: IdCart) => {
        const find = cart.find(item => item.id === id && item.quantity > minItems);
        if (find) {
            find.quantity -= 1;
            setCart([...cart]);
        }
    }

    const ClearCart = () => {
        setCart([]);
    };

    // stateDeribado 
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

    return { data, cart, AddToCart, RemoveToCart, IncremetQuantity, DecrementQuantity, ClearCart, isEmpty, cartTotal }
}

export default useCart
