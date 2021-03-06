import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../hooks/reduxHooks';
import { User } from '../types/BetTypes';
import axios from 'axios';

let messageColor: string;

export default function Account(): JSX.Element {
    const userId = useAppSelector(state => state.auth.id);
    const [editName, setEditName] = useState<boolean>(false);
    const [editEmail, setEditEmail] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: ''
    });
    const [user, setUser] = useState<User>({
        name: '',
        email: ''
    });

    const getUser = async (): Promise<void> => {
        await axios.get(`http://192.168.0.7:3333/users/${userId}`)
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            alert(err);
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    const editUserName = async (): Promise<void> => {
        await axios.put(`http://192.168.0.7:3333/users/${userId}`, {
            name: userCredentials.name
        })
        .then((response) => {
            setUser(response.data);
            setUserCredentials({ ...userCredentials, name: '' })
            successHandler('name');
        })
        .catch((err) => {
            alert(err);
        })
    };

    const editUserEmail = async (): Promise<void> => {
        await axios.put(`http://localhost:3333/users/${userId}`, {
            email: userCredentials.email
        })
        .then((response) => {
            setUser(response.data);
            setUserCredentials({ ...userCredentials, email: '' });
            successHandler('email');
        })
        .catch((err) => {
            alert(err);
        })
    };

    const handleEmailSubmit = (): void => {
        if (!userCredentials.email.includes('@')) {
            return failHandler('email');
        };

        editUserEmail();
    };

    const handleNameSubmit = (): void => {
        if (userCredentials.name.length < 3) {
            return failHandler('name');
        };

        editUserName();
    };

    const successHandler = (type: string): void => {
        messageColor = 'green';
        setMessage(`Your ${type} has successfully changed.`);
    };

    const failHandler = (type: string): void => {
        messageColor = 'red';
        setMessage(`Please enter a valid ${type}.`);
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Text style={{ paddingTop: 30, paddingBottom: 20, fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#B5C401' }}>{user.name ? user.name.toUpperCase() : 'USER'}'S PROFILE:</Text>
            <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                <Text style={{...styles.text, fontWeight: 'bold' }}>Name: </Text>
                <Text style={styles.text}>{user.name ? user.name : 'User'}</Text>
                <Ionicons name='create-outline' size={20} color='#B5C401' onPress={() => setEditName(!editName)} />
            </View>
            {editName && <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder='Edit your name' style={styles.input} autoCompleteType='name' keyboardType='name-phone-pad' value={userCredentials.name} onChangeText={(text) => {setUserCredentials({...userCredentials, name: text})}} />
                <TouchableOpacity style={{ backgroundColor: '#fff', justifyContent: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                    <Ionicons name='checkmark-circle-outline' size={20} color='#B5C401' style={{ padding: 20 }} onPress={() => handleNameSubmit()} />
                </TouchableOpacity>
            </View>}
            {message ? <Text style={{ padding: 10, fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', color: messageColor }}>{message}</Text> : null}
            <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                <Text style={{...styles.text, fontWeight: 'bold' }}>Email: </Text>
                <Text style={styles.text}>{user.email ? user.email : 'example@example.com'}</Text>
                <Ionicons name='create-outline' size={20} color='#B5C401' onPress={() => setEditEmail(!editEmail)} />
            </View>
            {editEmail && <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder='Edit your email' style={styles.input} autoCompleteType='email' autoCorrect={false} keyboardType='email-address' value={userCredentials.email} onChangeText={(text) => {setUserCredentials({...userCredentials, email: text})}} />
                <TouchableOpacity style={{ backgroundColor: '#fff', justifyContent: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                    <Ionicons name='checkmark-circle-outline' size={20} color='#B5C401' style={{ padding: 20 }} onPress={() => handleEmailSubmit()} />
                </TouchableOpacity>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#707070',
    },
    input: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingLeft: 20,
        width: 200,
        height: 70.8,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
})
