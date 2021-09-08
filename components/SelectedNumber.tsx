import React from 'react';;
import { TouchableOpacity, Text } from 'react-native'

export default function SelectedNumber({ onPress, number, bgc }: { onPress?: any, number: number, bgc: string }): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: bgc, borderRadius: 100, padding: 20 }}>
            <Text style={{ color: '#fff', fontSize: 18 }}>{number < 10 ? `0${number}` : number}</Text>
        </TouchableOpacity>
    );
};
