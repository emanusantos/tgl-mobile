import { createSlice } from '@reduxjs/toolkit';
import { Bet } from '../types/BetTypes';

const initialState: { cart: Bet[], savedCart: Bet[], total: number } = { cart: [{ id: '', game_id: 0, price: 0, numbers: '', color: '', type: ''  }], savedCart: [], total: 0.00};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addBet: (state, action) => {
            state.cart.push(action.payload);
        },
        removeBet: (state, action) => {
            let newCart = state.cart.filter((cartItem: Bet) => action.payload !== cartItem.id);
            state.cart = newCart;
            return
        },
        saveCart: (state) => {
            let newArr = state.savedCart.concat(state.cart);
            state.savedCart = newArr;
            return
        },
        reset: (state) => {
            state.cart = initialState.cart;
            state.total = initialState.total;
        },
        incrementTotal: (state, action) => {
            let newTotal = state.total + action.payload;
            state.total = newTotal;
            return
        },
        decrementTotal: (state, action) => {
            let newTotal = state.total - action.payload;
            state.total = newTotal;
            return
        }
    }
});

export const { addBet, removeBet, incrementTotal, decrementTotal, saveCart, reset } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;