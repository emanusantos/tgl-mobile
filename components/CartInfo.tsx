import React from 'react';
import { View, Text } from 'react-native';
import GameDisplay from './GameDisplay';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { removeBet } from '../store/cartSlice';

export default function CartInfo() {
    const dispatch = useAppDispatch();
    const bets = useAppSelector(state => state.cart.cart);

    return (
        <>
        {bets && bets.map((bet) => <GameDisplay onPress={() => dispatch(removeBet(bet.id))} date={new Date().toLocaleDateString('br')} color={bet.color} price={bet.price} type={bet.type} numbers={bet.numbers} trash={true} />)}
        </>
    );
};
