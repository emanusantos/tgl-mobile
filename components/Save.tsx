import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { Ionicons } from '@expo/vector-icons';
import { saveCart, reset } from '../store/cartSlice';
import axios from 'axios';

export default function Save() {
    const dispatch = useAppDispatch();
    const total = useAppSelector(state => state.cart.total);
    const bets = useAppSelector(state => state.cart.cart);
    const token = useAppSelector(state => state.auth.token);
    const [, ...rest] = bets;
    const postedData = rest.map(({ game_id, numbers }) => ({ game_id, numbers }));

    const postBets = async (): Promise<void> => {
        await axios.post('http://10.0.0.103:3333/bets', {
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
            return alert("You can't save your cart with less than R$30,00 in bets.");
        } else {
            dispatch(saveCart());
            postBets();
            alert('Your cart was saved successfully. Go to the Home screen to display your purchased bets');
            dispatch(reset());
        };
    };

    return (
        <TouchableOpacity onPress={handleSave} style={{ height: 95, backgroundColor: '#EBEBEB', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 13, borderBottomRightRadius: 13 }}>
            <Text style={{ fontSize: 30, color: '#B5C401', fontWeight: 'bold', fontStyle: 'italic' }}>Save <Ionicons name="arrow-forward-outline" size={30} color='#B5C401' /></Text>
        </TouchableOpacity>
    )
}
