import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { Ionicons } from '@expo/vector-icons';
import { saveCart } from '../store/cartSlice';

export default function Save() {
    const dispatch = useAppDispatch();
    const total = useAppSelector(state => state.cart.total);
    const handleSave = (): void => {
        if (total < 30) {
            return alert("You can't save your cart with less than R$30,00 in bets.");
        } else {
            dispatch(saveCart());
            alert('Success!');
        }
    };

    return (
        <TouchableOpacity onPress={handleSave} style={{ height: 95, backgroundColor: '#EBEBEB', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 13, borderBottomRightRadius: 13 }}>
            <Text style={{ fontSize: 30, color: '#B5C401', fontWeight: 'bold', fontStyle: 'italic' }}>Save <Ionicons name="arrow-forward-outline" size={30} color='#B5C401' /></Text>
        </TouchableOpacity>
    )
}
