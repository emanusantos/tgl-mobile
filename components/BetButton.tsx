import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function BetButton({ color, type }: { color: string, type: string }) {
    return (
        <TouchableOpacity>
            <View style={{ width: 100, borderWidth: 2, borderColor: color, paddingVertical: 5, borderRadius: 100, marginRight: 10, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 'bold', color: color }}>{type}</Text>
            </View>
        </TouchableOpacity>
    );
};
