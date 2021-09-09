import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Foundation } from '@expo/vector-icons';

interface SelectedNumberProps {
    number: number;
    bgc: string;
    size: number;
    fontSize: number;
    hasX?: boolean;
    onPress: any;
};

export default function SelectedNumber({ onPress, number, bgc, size, fontSize, hasX }: SelectedNumberProps): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: bgc, borderRadius: 100, padding: size, margin: 5 }}>
            <Text style={{ color: '#fff', fontSize: fontSize }}>{number < 10 ? `0${number}` : number}</Text>
            {hasX && <Foundation name='x' size={8} color='#fff' style={{ position: 'absolute', left: 25, top: 6 }} />}
        </TouchableOpacity>
    );
};
