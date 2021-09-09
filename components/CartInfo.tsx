import React from 'react';
import { View, Text } from 'react-native';
import GameDisplay from './GameDisplay';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { removeBet, decrementTotal } from '../store/cartSlice';

export default function CartInfo() {
    const dispatch = useAppDispatch();
    const bets = useAppSelector(state => state.cart.cart);
    const [, ...rest] = bets;

    const handleRemove = (id: string, price: number) => {
        dispatch(removeBet(id));
        dispatch(decrementTotal(price));
    };

    return (
        <>
        {bets && rest.map((bet) => <GameDisplay onPress={() => handleRemove(bet.id, bet.price)} date={new Date().toLocaleDateString('br')} key={bet.id} color={bet.color} price={bet.price} type={bet.type} numbers={bet.numbers} trash={true} />)}
        </>
    );
};
