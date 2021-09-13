import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ScreenProps } from '../types/FormScreenTypes';
import { styles } from '../styles/LoginStyleSheet';
import axios from 'axios';

export default function ResetPassword({ stateStyle, setScreen }: ScreenProps): JSX.Element {
    const [email, setEmail] = useState('');

    const submitHandler = (e: NativeSyntheticEvent<NativeTouchEvent>): void => {
        e.preventDefault();

        if (!email.includes('@')) {
            return alert('Please enter a valid email.');
        };

        recovery();
    };

    const recovery = async (): Promise<void> => {
        await axios.post('http://192.168.0.7:3333/passwords', {
            "email": email,
            "redirect_url": 'http://192.168.0.7:3333/recover'
        }).then(res => {
            alert('An recovery token was sent to your e-mail.');
        }).catch(err => {
            alert('Something went wrong with your recovery.');
        });
    };

    return (
        <View style={{...styles.container, opacity: stateStyle.opacity}}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <Text style={styles.tgl}>TGL</Text>
                <View style={{ width: 100, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
            </View>
            <Text style={{ paddingTop: 35, color: '#707070', fontSize: 35, fontStyle: 'italic', fontWeight: 'bold' }}>Reset Password</Text>
            <View style={{...styles.box, elevation: stateStyle.opacity}}>
                <TextInput
                    value={email}
                    placeholder='Email' 
                    style={styles.input} 
                    autoCompleteType='email' 
                    autoCorrect={false} 
                    keyboardType='email-address'
                    onChangeText={(text) => setEmail(text)}
                />
                <TouchableOpacity onPress={(e) => submitHandler(e)}>
                    <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#B5C401', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }}>Send link</Text>
                        <Ionicons style={{ marginTop: 5, marginLeft: 8 }} name="arrow-forward-outline" size={30} color='#B5C401' />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={{ paddingTop: 35, color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }} onPress={() => setScreen('Login')}>
                <Ionicons name="arrow-back-outline" size={30} color='#707070' />
                Back
            </Text>
            <Text style={{ paddingTop: 35, color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }} onPress={() => setScreen('SignUp')}>
                Sign Up 
                <Ionicons name="arrow-forward-outline" size={30} color='#707070' />
            </Text>
        </View>
    );
};