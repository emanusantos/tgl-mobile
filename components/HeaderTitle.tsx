import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HeaderTitle({ padding, paddingH, paddingV }: { padding?: number, paddingH?: number, paddingV?: number }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: '#fff', padding: padding }}>
            <View style={{ alignItems: 'center', paddingBottom: 15, paddingHorizontal: paddingH, paddingVertical: paddingV }}>
                <Text style={{ color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }}>TGL</Text>
                <View style={{ width: 70, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
            </View>
        <MaterialIcons name='logout' size={30} color='#C1C1C1' style={{ paddingBottom: 10, paddingHorizontal: paddingH, paddingVertical: paddingV }} />
        </View>
    );
};
