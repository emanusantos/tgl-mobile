import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import GameDisplay from './GameDisplay';

const numbers = '01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03';

export default function Cart({ navigation }: DrawerContentComponentProps): JSX.Element {
    return (
        <View style={{ flex: 1 }}>
            <Foundation name='x' size={20} color='#B5C401' style={{ alignSelf: 'flex-end', padding: 30 }} onPress={() => {navigation.closeDrawer()}} />
            <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                <MaterialCommunityIcons name='cart-outline' size={35} color='#B5C401' />
                <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070', paddingLeft: 10 }}>CART</Text>
            </View>
            <ScrollView style={{ padding: 10 }}>
                <GameDisplay numbers={numbers} color='#01AC66' date='07/09/2020' price={2.50} type='Mega-Sena' trash={false}  />
                <GameDisplay numbers={numbers} color='#01AC66' date='07/09/2020' price={2.50} type='Mega-Sena' trash={false}  />
                <GameDisplay numbers={numbers} color='#01AC66' date='07/09/2020' price={2.50} type='Mega-Sena' trash={false}  />
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#707070', fontSize: 15 }}>CART </Text>
                    <Text style={{ color: '#707070', fontSize: 15 }}>TOTAL:</Text>
                </View>
                <Text style={{ fontWeight: 'bold', color: '#707070', fontSize: 15 }}>R$ 0,00</Text>
            </View>
            <TouchableOpacity style={{ height: 95, backgroundColor: '#EBEBEB', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 13, borderBottomRightRadius: 13 }}>
                <Text style={{ fontSize: 30, color: '#B5C401', fontWeight: 'bold', fontStyle: 'italic' }}>Save <Ionicons name="arrow-forward-outline" size={30} color='#B5C401' /></Text>
            </TouchableOpacity>
        </View>
    );
};


