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

    return { data, cart, IncremetQuantity, DecrementQuantity, ClearCart, isEmpty, cartTotal }
}

export default useCart
