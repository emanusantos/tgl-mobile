import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, Image, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import { Ref, RootStackParamList, SStyles } from '../types/FormScreenTypes';
import { styles } from '../styles/LoginStyleSheet';
import axios from 'axios';
import { authSession, setId } from '../store/authSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import * as Progress from 'react-native-progress';
import { User } from '../types/BetTypes';
import Error from '../components/Error';

let errorMessage: string;

export default function Login({ navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    });
    const [visible, setVisible] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [screen, setScreen] = useState<string>('Login');
    const [style, setStyle] = useState<SStyles>({ opacity: .5, elevation: 0 });
    const imgRef = useRef<Image & Ref>(null);

    const handleLogin = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
        setLoading(true);
        event.preventDefault();

        if (!userCredentials.email.includes('@')) {
            setLoading(false);
            setStyle({ elevation: 0, opacity: .5 });
            errorMessage = 'Please enter a valid email.';
            return setModalVisible(true);
        };

        if (userCredentials.password.length <= 3) {
            setLoading(false);
            setStyle({ elevation: 0, opacity: .5 });
            errorMessage = 'Please enter a valid password.';
            return setModalVisible(true);
        };

        setTimeout(() => {
            setStyle({ opacity: .5, elevation: 0 });
        }, 1000);
        postAuth();
    };

    const animationEnd = (): void => {
        setTimeout(() => {
            setStyle({ opacity: 1, elevation: 8 });
            imgRef.current!.animate('fadeOutUpBig', 1000);
        }, 1000);
    };
   
    const postAuth = async (): Promise<void> => {
        await axios.post('http://192.168.0.7:3333/sessions', {
            "email": userCredentials.email,
            "password": userCredentials.password
        }).then(res => {
            dispatch(authSession(res.data.token));
            storeUserId();
            navigation.navigate('HomeTabs');
            reset();
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            alert('Invalid email/password combination!');
        });
    };

    const storeUserId = async (): Promise<void> => {
        await axios.get('http://192.168.0.7:3333/users').then(res => {
            const index = res.data.findIndex((user: User) => user.email === userCredentials.email);
            const id = res.data[index].id;
            dispatch(setId(id));
        }).catch(err => {
            alert(err);
        })
    };

    const reset = () => {
        setUserCredentials({ email: '', password: '' });
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
 
    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Progress.Circle size={150} color='#B5C401' indeterminate={true} animated={true} />
            </View>
        );
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
            {modalVisible 
            ? <Error 
                modalVisible={modalVisible} 
                toggleModal={toggleModal} 
                message={errorMessage} /> 
            : null}
            <View style={{...styles.container, opacity: style.opacity}}>
            <StatusBar style="auto" />
                <View style={styles.header}>
                    <Text style={styles.tgl}>TGL</Text>
                    <View style={{ width: 100, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
                </View>
                <Text style={{ paddingTop: 35, color: '#707070', fontSize: 35, fontStyle: 'italic', fontWeight: 'bold' }}>Authentication</Text>
                <View style={{...styles.box, elevation: style.elevation}}>
                    <TextInput
                        value={userCredentials.email}
                        placeholder='Email' 
                        style={styles.input} 
                        autoCompleteType='email' 
                        autoCorrect={false} 
                        keyboardType='email-address'
                        onChangeText={(text) => {setUserCredentials({...userCredentials, email: text})}}
                    />
                    <TextInput 
                        value={userCredentials.password}
                        placeholder='Password' 
                        style={styles.input} 
                        secureTextEntry={visible} 
                        onChangeText={(text) => {setUserCredentials({...userCredentials, password: text})}}
                    />
                    <Ionicons 
                        onPress={() => setVisible(!visible)} 
                        name='eye-outline' 
                        size={27} 
                        color='#C1C1C1' 
                        style={{ position: 'absolute', top: 92, right: 20 }} 
                    />
                    <Text 
                        style={{ marginLeft: 100, color: '#C1C1C1', padding: 20, fontStyle: 'italic' }} 
                        onPress={() => setScreen('ResetPassword')}
                    >
                        I forget my password
                    </Text>
                    <TouchableOpacity onPress={(e) => handleLogin(e)}>
                        <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#B5C401', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }}>Log In</Text>
                            <Ionicons style={{ marginTop: 5, marginLeft: 8 }} name="arrow-forward-outline" size={30} color='#B5C401' />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text 
                    style={{ paddingTop: 35, color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }} 
                    onPress={() => setScreen('SignUp')}
                >
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
