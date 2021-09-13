import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ScreenProps, SStyles } from '../types/FormScreenTypes';
import { styles } from '../styles/LoginStyleSheet';
import Error from '../components/Error';
import axios from 'axios';

let message: string;

export default function ResetPassword({ setScreen }: ScreenProps): JSX.Element {
    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [style, setStyle] = useState<SStyles>({ opacity: 1, elevation: 8 });

    const submitHandler = (e: NativeSyntheticEvent<NativeTouchEvent>): void => {
        e.preventDefault();

        if (!email.includes('@')) {
            message = 'Please enter a valid email.'
            return toggleModal();
        };

        recovery();
    };

    const recovery = async (): Promise<void> => {
        await axios.post('http://192.168.0.7:3333/passwords', {
            "email": email,
            "redirect_url": "http://meusistema.com/recover"
        }).then(res => {
            message = 'An recovery token was sent to your email.'
            toggleModal();
        }).catch(err => {
            alert(err.message);
            return
            message = 'Something went wrong with your recovery.'
            toggleModal();
        });
    };

    const toggleModal = () => {
        if (!modalVisible) {
            setModalVisible(true);
            setStyle({ elevation: 0, opacity: .5 });
        } else {
            setStyle({ elevation: 8, opacity: 1 })
            setModalVisible(false);
        }
    };

    return (
        <View style={{...styles.container, opacity: style.opacity}}>
            {modalVisible ? <Error modalVisible={modalVisible} message={message} toggleModal={toggleModal} /> : null}
            <StatusBar style="auto" />
            <View style={styles.header}>
                <Text style={styles.tgl}>TGL</Text>
                <View style={{ width: 100, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
            </View>
            <Text style={{ paddingTop: 35, color: '#707070', fontSize: 35, fontStyle: 'italic', fontWeight: 'bold' }}>Reset Password</Text>
            <View style={{...styles.box, elevation: style.elevation}}>
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