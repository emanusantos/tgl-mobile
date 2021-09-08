import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import { Ref, RootStackParamList, SStyles } from '../types/FormScreenTypes';
import { styles } from '../styles/LoginStyleSheet';

export default function Login({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>): JSX.Element {
    const [visible, setVisible] = useState<boolean>(true);
    const [screen, setScreen] = useState<string>('Login');
    const [style, setStyle] = useState<SStyles>({ opacity: .5, elevation: 0 });
    const imgRef = useRef<Image & Ref>(null);
    const animationEnd = (): void => {
        setTimeout(() => {
            setStyle({ opacity: 1, elevation: 8 });
            imgRef.current!.animate('fadeOutUpBig', 1000);
        }, 1000);
    };

    if (screen === 'Login') {
        return (
            <>
            <Animatable.Image
                animation='fadeInUpBig'
                duration={1500}
                ref={imgRef}
                onAnimationEnd={animationEnd}
                style={styles.img} source={require('../assets/splash.png')} 
            />
            <View style={{...styles.container, opacity: style.opacity}}>
            <StatusBar style="auto" />
                <View style={styles.header}>
                    <Text style={styles.tgl}>TGL</Text>
                    <View style={{ width: 100, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
                </View>
                <Text style={{ paddingTop: 35, color: '#707070', fontSize: 35, fontStyle: 'italic', fontWeight: 'bold' }}>Authentication</Text>
                <View style={{...styles.box, elevation: style.elevation}}>
                    <TextInput placeholder='Email' style={styles.input} autoCompleteType='email' autoCorrect={false} keyboardType='email-address' />
                    <TextInput placeholder='Password' style={styles.input} secureTextEntry={visible} />
                    <Ionicons onPress={() => setVisible(!visible)} name='eye-outline' size={27} color='#C1C1C1' style={{ position: 'absolute', top: 92, right: 20 }} />
                    <Text style={{ marginLeft: 100, color: '#C1C1C1', padding: 20, fontStyle: 'italic' }} onPress={() => setScreen('ResetPassword')}>I forget my password</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')}>
                        <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#B5C401', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }}>Log In</Text>
                            <Ionicons style={{ marginTop: 5, marginLeft: 8 }} name="arrow-forward-outline" size={30} color='#B5C401' />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ paddingTop: 35, color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }} onPress={() => setScreen('SignUp')}>
                    Sign Up 
                    <Ionicons name="arrow-forward-outline" size={30} color='#707070' />
                </Text>
            </View>
            </>
        );
    } else if (screen === 'SignUp') {
        return <SignUp 
            stateStyle={style} 
            visible={visible} 
            setVisible={setVisible} 
            setScreen={setScreen} 
            navigation={navigation} 
        />
    } else {
        return <ResetPassword 
            stateStyle={style} 
            setScreen={setScreen} 
            navigation={navigation} 
        />
    }
};
