import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function Cart({ navigation }: DrawerContentComponentProps) {
    return (
        <View style={styles.container}>
            <Foundation name='x' size={20} color='#B5C401' style={{ alignSelf: 'flex-end', padding: 15 }} onPress={() => {navigation.closeDrawer()}} />
            <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                <MaterialCommunityIcons name='cart-outline' size={35} color='#B5C401' />
                <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070', paddingLeft: 10 }}>CART</Text>
            </View>
            <ScrollView>
                <View style={{ padding: 15, flexDirection: 'row' }}>
                    <View style={{ height: 78, width: 6, backgroundColor: '#7F3992', borderRadius: 100 }}></View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: '#868686', fontSize: 12, fontWeight: 'bold', fontStyle: 'italic' }}>01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#868686', fontSize: 12 }}>data e preco</Text>
                            <Text>icone lixeira</Text>
                        </View>
                        <Text style={{ fontSize: 16, color: '#7F3992', fontWeight: 'bold', fontStyle: 'italic' }}>Lotofácil</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


