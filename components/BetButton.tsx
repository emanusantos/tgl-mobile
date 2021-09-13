import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Foundation } from '@expo/vector-icons';

export default function BetButton({ color, border, bgc, type, onPress, hasClose }: { color: string, border: string, bgc: string, type: string, onPress?: any, hasClose?: boolean }): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ width: 100, borderWidth: 2, borderColor: border, paddingVertical: 5, borderRadius: 100, marginRight: 10, alignItems: 'center', backgroundColor: bgc }}>
                <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 'bold', color: color }}>{type}</Text>
                {hasClose ? <Foundation name='x' size={12} color='#fff' style={{ position: 'absolute', right: 5, top: 2 }} /> : null}
            </View>
        </TouchableOpacity>
    );
};
