import React from 'react';;
import { TouchableOpacity, Text } from 'react-native'

export default function SelectedNumber({ onPress, number }: { onPress?: () => void, number: number }) {
    return (
        <TouchableOpacity onPress={onPress} data-number={number} style={{ backgroundColor: '#ADC0C4', borderRadius: 100, padding: 20 }}>
            <Text style={{ color: '#fff', fontSize: 18 }}>{number < 10 ? `0${number}` : number}</Text>
        </TouchableOpacity>
    );
};
