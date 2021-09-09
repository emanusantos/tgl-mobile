import React from 'react';
import { View, Text, ColorValue } from 'react-native';

export interface Game {
    color: ColorValue;
    numbers: string;
    date: string;
    price: number;
    type: string;
    trash: boolean;
};

export default function GameDisplay({ color, numbers, date, price, type, trash }: Game): JSX.Element {
    return (
        <View style={{ paddingVertical: 10, paddingHorizontal: 5, flexDirection: 'row' }}>
            <View style={{ height: 'auto', width: 6, backgroundColor: color, borderRadius: 100 }}></View>
            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ color: '#868686', fontSize: 12, fontWeight: 'bold', fontStyle: 'italic' }}>{numbers}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                    <Text style={{ color: '#868686', fontSize: 12 }}>{date} - (R$ {price.toFixed(2).replace('.', ',')})</Text>
                    {trash && <Text>icone lixeira</Text>}
                </View>
                <Text style={{ fontSize: 16, color: color, fontWeight: 'bold', fontStyle: 'italic' }}>{type}</Text>
            </View>
        </View>
    );
};
