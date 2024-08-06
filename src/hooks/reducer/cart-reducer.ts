import { db } from './../../data/db';
import { CartItem, Guitar, IdCart } from './../../types/types';

const maxItems = 5;
const minItems = 1;

export type CartAaction =
    { type: 'add-to-cart', payload: { item: Guitar } } |
    { type: 'remove-to-cart', payload: { id: Guitar['id'] } } |
    { type: 'increment-quantity', payload: { id: IdCart } } |
    { type: 'decrement-quantity', payload: { id: IdCart } } |
    { type: 'clear-cart' } 


export type cartState = {
    data: Guitar[],
    cart: CartItem[],
}

const localstorageState = (): CartItem[] => {
    return JSON.parse(localStorage.getItem('cart')!) || []
}


export const initialState = {
    data: db,
    cart: localstorageState(),
}

export const cartReducer = (state: cartState = initialState, action: CartAaction) => {

    if (action.type === 'add-to-cart') {

        const itemExist = state.cart.find(itemCart => itemCart.id === action.payload.item.id);
        let updatedCart: CartItem[] = [];
        if (itemExist) {
            updatedCart = state.cart.map(item => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity >= maxItems) return item;
                    return { ...item, quantity: item.quantity + 1 }
                } else {
                    return item
                }
            })
        } else {
            const newItem = { ...action.payload.item, quantity: 1 };
            updatedCart = [...state.cart, newItem];
        }

        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'remove-to-cart') {
        const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === 'increment-quantity') {
        const updatedCart = state.cart.map(item => {
            if (item.id === action.payload.id) {
                if (item.quantity >= maxItems) return item;
                return { ...item, quantity: item.quantity + 1 }
            } else {
                return item
            }
        })
        return {
            ...state,
            cart: updatedCart
        }
        
    }


    if (action.type === 'decrement-quantity') {
        const updatedCart = state.cart.map(item => {
            if (item.id === action.payload.id) {
                if (item.quantity === minItems) return item;
                return { ...item, quantity: item.quantity - 1 }
            } else {
                return item
            }
        })
        return {
            ...state,
            cart: updatedCart
        }
        
    }

    if (action.type === 'clear-cart') {
        return {
            ...state,
            cart: []
        }
        
    }

    return state
}
