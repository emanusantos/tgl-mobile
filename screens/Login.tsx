import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';

type Ref = {
    animate: (name: string, timer: number) => void;
};

type RootStackParamList = {
    Home: undefined;
    HomeTabs: undefined;
    Newbet: undefined;
};

interface Styles {
    opacity: number;
    elevation: number;
};

export default function Login({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>): JSX.Element {
    const [style, setStyle] = useState<Styles>({ opacity: .5, elevation: 0 });
    const imgRef = useRef<Image & Ref>(null);
    const animationEnd = (): void => {
        setTimeout(() => {
            setStyle({ opacity: 1, elevation: 8 });
            imgRef.current!.animate('fadeOutUpBig', 1000);
        }, 1000);
    };

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
                <TextInput placeholder='Password' style={styles.input} secureTextEntry={true} />
                <Text style={{ marginLeft: 100, color: '#C1C1C1', padding: 20, fontStyle: 'italic' }}>I forget my password</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeTabs')}>
                    <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#B5C401', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }}>Log In</Text>
                        <Ionicons style={{ marginTop: 5, marginLeft: 8 }} name="arrow-forward-outline" size={30} color='#B5C401' />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={{ paddingTop: 35, color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }}>
                Sign Up 
                <Ionicons name="arrow-forward-outline" size={30} color='#707070' />
            </Text>
        </View>
        </>
    )
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
