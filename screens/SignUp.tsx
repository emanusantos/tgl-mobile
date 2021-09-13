import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SignUpProps, SStyles } from '../types/FormScreenTypes';
import { styles } from '../styles/LoginStyleSheet';
import { useAppDispatch } from '../hooks/reduxHooks';
import { authSession } from '../store/authSlice';
import Error from '../components/Error';
import axios from 'axios';

let message: string;

export default function SignUp({ visible, setVisible, setScreen, navigation }: SignUpProps): JSX.Element {
    const dispatch = useAppDispatch();
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [style, setStyle] = useState<SStyles>({ opacity: 1, elevation: 8 });


    const submitHandler = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
        e.preventDefault();

        if (userCredentials.name.length < 3) {
            message = 'Please enter a valid name.';
            return toggleModal();
        };

        if (!userCredentials.email.includes('@')) {
            message = 'Please enter a valid email.';
            return toggleModal();
        };

        if (userCredentials.password.length <= 3) {
            message = 'Your password length must be greater than 3.';
            return toggleModal();
        };

        postData();
    };

    const postData = async (): Promise<void> => {
        await axios.post('http://192.168.0.7:3333/users', {
            "name": userCredentials.name,
            "email": userCredentials.email,
            "password": userCredentials.password
        }).then(res => {
            message = 'Your account has been created successfully.'
            toggleModal();
            postAuth();
            resetFields();
        }).catch(err => {
            message = 'Something went wrong creating your account. Please try again later.'
            toggleModal();
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
            alert(err.message);
        });
    };

    const resetFields = (): void => {
        setUserCredentials({
            name: '',
            email: '',
            password: ''
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
            <StatusBar style='auto' />
            <Error modalVisible={modalVisible} toggleModal={toggleModal} message={message} />
            <View style={styles.header}>
                <Text style={styles.tgl}>TGL</Text>
                <View style={{ width: 100, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
            </View>
            <Text style={{ paddingTop: 35, color: '#707070', fontSize: 35, fontStyle: 'italic', fontWeight: 'bold' }}>Registration</Text>
            <View style={{...styles.box, elevation: style.elevation}}>
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
