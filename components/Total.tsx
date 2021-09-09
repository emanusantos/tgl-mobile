import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../hooks/reduxHooks';

export default function Total() {
    const total = useAppSelector(state => state.cart.total);
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 30 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#707070', fontSize: 15 }}>CART </Text>
                <Text style={{ color: '#707070', fontSize: 15 }}>TOTAL:</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: '#707070', fontSize: 15 }}>R$ {total ? total.toFixed(2).replace('.', ',') : `0,00`}</Text>
        </View>
    );
};
