import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import GameDisplay from './GameDisplay';

const numbers = '01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03';

export default function Cart({ navigation }: DrawerContentComponentProps) {
    return (
        <View style={styles.container}>
            <Foundation name='x' size={20} color='#B5C401' style={{ alignSelf: 'flex-end', padding: 15 }} onPress={() => {navigation.closeDrawer()}} />
            <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                <MaterialCommunityIcons name='cart-outline' size={35} color='#B5C401' />
                <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070', paddingLeft: 10 }}>CART</Text>
            </View>
            <ScrollView style={{ padding: 10 }}>
                <GameDisplay numbers={numbers} color='#01AC66' date='07/09/2020' price={2.50} type='Mega-Sena' trash={false}  />
                <GameDisplay numbers={numbers} color='#01AC66' date='07/09/2020' price={2.50} type='Mega-Sena' trash={false}  />
                <GameDisplay numbers={numbers} color='#01AC66' date='07/09/2020' price={2.50} type='Mega-Sena' trash={false}  />
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


