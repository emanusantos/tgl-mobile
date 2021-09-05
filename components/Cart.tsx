import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function Cart({ navigation }: DrawerContentComponentProps) {
    return (
        <View style={styles.container}>
            <Foundation name='x' size={20} color='#B5C401' style={{ alignSelf: 'flex-end', padding: 15 }} onPress={() => {navigation.closeDrawer()}} />
            <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name='cart-outline' size={35} color='#B5C401' />
                <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070', paddingLeft: 10 }}>CART</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


