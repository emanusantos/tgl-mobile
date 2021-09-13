import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SignUpProps } from '../types/FormScreenTypes';
import { styles } from '../styles/LoginStyleSheet';
import { useAppDispatch } from '../hooks/reduxHooks';
import { authSession } from '../store/authSlice';
import axios from 'axios';

export default function SignUp({ stateStyle, visible, setVisible, setScreen, navigation }: SignUpProps): JSX.Element {
    const dispatch = useAppDispatch();
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: ''
    });

    const submitHandler = (e: any) => {
        e.preventDefault();

        if (userCredentials.name.length < 3) {
            return alert('Please enter a valid name.')
        };

        if (!userCredentials.email.includes('@')) {
            return alert('Please enter a valid e-mail.');
        };

        if (userCredentials.password.length <= 3) {
            return alert('Your password length must be greater than 3.');
        };

        postData();
    };

    const postData = async (): Promise<void> => {
        await axios.post('http://192.168.0.7:3333/users', {
            "name": userCredentials.name,
            "email": userCredentials.email,
            "password": userCredentials.password
        }).then(res => {
            alert('Your account has been created succesfully. Log In with your brand-new credentials!');
            postAuth();
            resetFields();
        }).catch(err => {
            alert('Something went wrong creating your account.');
        });
    };

    const postAuth = async (): Promise<void> => {
        await axios.post('http://192.168.0.7:3333/sessions', {
            "email": userCredentials.email,
            "password": userCredentials.password
        }).then(res => {
            dispatch(authSession(res.data.token));
            navigation.navigate('HomeTabs');
        }).catch(err => {
            alert('Invalid email/password combination!');
        });
    };

    const resetFields = (): void => {
        setUserCredentials({
            name: '',
            email: '',
            password: ''
        });
    };

    return (
        <View style={{...styles.container, opacity: stateStyle.opacity}}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <Text style={styles.tgl}>TGL</Text>
                <View style={{ width: 100, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
            </View>
            <Text style={{ paddingTop: 35, color: '#707070', fontSize: 35, fontStyle: 'italic', fontWeight: 'bold' }}>Registration</Text>
            <View style={{...styles.box, elevation: stateStyle.elevation}}>
                <TextInput 
                    value={userCredentials.name}
                    placeholder='Name' 
                    style={styles.input} 
                    autoCompleteType='name' 
                    keyboardType='name-phone-pad'
                    onChangeText={(text) => setUserCredentials({...userCredentials, name: text})}
                />
                <TextInput 
                    value={userCredentials.email}
                    placeholder='Email' 
                    style={styles.input} 
                    autoCompleteType='email' 
                    autoCorrect={false} 
                    keyboardType='email-address'
                    onChangeText={(text) => setUserCredentials({...userCredentials, email: text})}
                />
                <TextInput 
                    value={userCredentials.password}
                    placeholder='Password' 
                    style={styles.input} 
                    secureTextEntry={visible}
                    onChangeText={(text) => setUserCredentials({...userCredentials, password: text})}
                />
                <Ionicons 
                    onPress={() => setVisible(!visible)} 
                    name='eye-outline' 
                    size={27} 
                    color='#C1C1C1' 
                    style={{ position: 'absolute', bottom: 100, right: 20 }}
                />
                <TouchableOpacity onPress={(e) => submitHandler(e)}>
                    <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#B5C401', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }}>Register</Text>
                        <Ionicons style={{ marginTop: 5, marginLeft: 8 }} name="arrow-forward-outline" size={30} color='#B5C401' />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={{ paddingTop: 35, color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }} onPress={() => setScreen('Login')}>
                <Ionicons name="arrow-back-outline" size={30} color='#707070' />
                Back
            </Text>
        </View>
    );
};
