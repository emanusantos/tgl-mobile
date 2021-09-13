import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Foundation } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { Ionicons } from '@expo/vector-icons';
import { reset } from '../store/cartSlice';
import axios from 'axios';
import CartInfo from './CartInfo';
import Total from './Total';
import Error from './Error';

let message: string;

export default function Cart({ navigation }: DrawerContentComponentProps): JSX.Element {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useAppDispatch();
    const total = useAppSelector(state => state.cart.total);
    const bets = useAppSelector(state => state.cart.cart);
    const token = useAppSelector(state => state.auth.token);
    const [, ...rest] = bets;
    const postedData = rest.map(({ game_id, numbers }) => ({ game_id, numbers }));

    const postBets = async (): Promise<void> => {
        await axios.post('http://192.168.0.7:3333/bets', {
            'betCart': postedData
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
        }).catch(err => {
            alert(err);
        });
    };

    const handleSave = (): void => {
        if (total < 30) {
            message = "You can't save your cart with less than R$30,00 in bets.";
            return toggleModal();
        } else {
            postBets();
            message = 'Your cart was saved successfully. Go to the Home screen to see your newly purchased bets!';
            navigation.closeDrawer();
            toggleModal();
            dispatch(reset());
        };
    };

    const toggleModal = () => {
        if (!modalVisible) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Error modalVisible={modalVisible} toggleModal={toggleModal} message={message} />
            <Foundation name='x' size={25} color='#B5C401' style={{ alignSelf: 'flex-end', padding: 20, marginTop: 25 }} onPress={() => {navigation.closeDrawer()}} />
            <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                <MaterialCommunityIcons name='cart-outline' size={35} color='#B5C401' />
                <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070', paddingLeft: 10 }}>CART</Text>
            </View>
            <ScrollView style={{ padding: 10 }}>
                <CartInfo />
            </ScrollView>
            <Total />
            <TouchableOpacity onPress={handleSave} style={{ height: 95, backgroundColor: '#EBEBEB', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 13, borderBottomRightRadius: 13 }}>
                <Text style={{ fontSize: 30, color: '#B5C401', fontWeight: 'bold', fontStyle: 'italic' }}>Save <Ionicons name="arrow-forward-outline" size={30} color='#B5C401' /></Text>
            </TouchableOpacity>
        </View>
    );
};


