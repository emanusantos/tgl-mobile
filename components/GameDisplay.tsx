import React from 'react';
import { View, Text } from 'react-native';

export interface Game {
    color: string;
    numbers: string;
    date: string;
    price: number;
    type: string;
};

export default function GameDisplay({ color, numbers, date, price, type }: Game) {
    return (
        <View style={{ padding: 15, flexDirection: 'row' }}>
            <View style={{ height: 78, width: 6, backgroundColor: color, borderRadius: 100 }}></View>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: '#868686', fontSize: 12, fontWeight: 'bold', fontStyle: 'italic' }}>{numbers}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#868686', fontSize: 12 }}>{date} - (R$ {price})</Text>
                    <Text>icone lixeira</Text>
                </View>
                <Text style={{ fontSize: 16, color: color, fontWeight: 'bold', fontStyle: 'italic' }}>{type}</Text>
            </View>
        </View>
    );
};
