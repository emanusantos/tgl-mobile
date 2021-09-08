import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function BetButton({ color, border, bgc, type, onPress }: { color: string, border: string, bgc: string, type: string, onPress?: any }): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ width: 100, borderWidth: 2, borderColor: border, paddingVertical: 5, borderRadius: 100, marginRight: 10, alignItems: 'center', backgroundColor: bgc }}>
                <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 'bold', color: color }}>{type}</Text>
            </View>
        </TouchableOpacity>
    );
};
