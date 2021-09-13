import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch } from '../hooks/reduxHooks';
import { logout } from '../store/authSlice';
import { reset } from '../store/cartSlice';

export default function HeaderTitle({ padding, paddingH, paddingV, opacity, navigation }: { padding?: number, paddingH?: number, paddingV?: number, opacity?: number, navigation: any}) {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigation.navigate('Login');
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: '#fff', padding: padding, opacity: opacity }}>
            <View style={{ alignItems: 'center', paddingBottom: 15, paddingHorizontal: paddingH, paddingVertical: paddingV }}>
                <Text style={{ color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }}>TGL</Text>
                <View style={{ width: 70, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
            </View>
        <MaterialIcons onPress={handleLogout} name='logout' size={30} color='#C1C1C1' style={{ paddingBottom: 10, paddingHorizontal: paddingH, paddingVertical: paddingV }} />
        </View>
    );
};
