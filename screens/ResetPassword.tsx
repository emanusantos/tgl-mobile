import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SStyles, ScreenProps } from '../types/FormScreenTypes';

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
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeTabs')}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
    },
    img: {
        position: 'absolute',
        zIndex: 10,
        bottom: 0,
        width: '100%',
        height: '85%',
    },
    header: {
        alignItems: 'center',
    },
    tgl: {
        color: '#707070',
        fontSize: 44,
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginTop: 70,
    },
    box: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#fff',
    },
    input: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingLeft: 20,
        width: 306,
        height: 70.8,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },
    button: {

    },
  });