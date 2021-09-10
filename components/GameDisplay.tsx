import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Game {
    color: string;
    numbers: string;
    date: string;
    price: number;
    type: string;
    trash: boolean;
    onPress?: any;
};

export default function GameDisplay({ color, numbers, date, price, type, trash, onPress }: Game): JSX.Element {
    return (
        <View style={{ paddingVertical: 10, paddingHorizontal: 5, flexDirection: 'row', width: '90%' }}>
            <View style={{ height: 'auto', width: 6, backgroundColor: color, borderRadius: 100 }}></View>
            <View style={{ paddingHorizontal: 15 }}>
                <Text style={{ color: '#868686', fontSize: 12, fontWeight: 'bold', fontStyle: 'italic' }}>{numbers}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, width: '95%' }}>
                    <Text style={{ color: '#868686', fontSize: 12 }}>{date} - (R$ {price && price.toFixed(2).replace('.', ',')})</Text>
                    {trash && <Ionicons onPress={onPress} name='trash-outline' size={15} color='#707070' />}
                </View>
                <Text style={{ fontSize: 16, color: color, fontWeight: 'bold', fontStyle: 'italic' }}>{type}</Text>
            </View>
        </View>
    );
};
