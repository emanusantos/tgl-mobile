import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ScreenProps } from '../types/FormScreenTypes';
import { styles } from '../styles/LoginStyleSheet';

export default function ResetPassword({ stateStyle, navigation, setScreen }: ScreenProps) {
    return (
        <View style={{...styles.container, opacity: stateStyle.opacity}}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <Text style={styles.tgl}>TGL</Text>
                <View style={{ width: 100, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
            </View>
            <Text style={{ paddingTop: 35, color: '#707070', fontSize: 35, fontStyle: 'italic', fontWeight: 'bold' }}>Reset Password</Text>
            <View style={{...styles.box, elevation: stateStyle.opacity}}>
                <TextInput placeholder='Email' style={styles.input} autoCompleteType='email' autoCorrect={false} keyboardType='email-address' />
                <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')}>
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