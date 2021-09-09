import { createSlice } from '@reduxjs/toolkit';
import { Bet } from '../types/BetTypes';

const initialState: { cart: Bet[] } = { cart: [{ id: '', game_id: 0, price: 0, numbers: '', color: '', type: ''  }] };

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
        }
    }
});

export const { addBet, removeBet } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;