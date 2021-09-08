import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Account(): JSX.Element {
    const [editName, setEditName] = useState<boolean>(false);
    const [editEmail, setEditEmail] = useState<boolean>(false);

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Text style={{ paddingTop: 30, paddingBottom: 20, fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#B5C401' }}>USER'S PROFILE:</Text>
            <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                <Text style={{...styles.text, fontWeight: 'bold' }}>Name: </Text>
                <Text style={styles.text}>User </Text>
                <Ionicons name='create-outline' size={20} color='#B5C401' onPress={() => setEditName(!editName)} />
            </View>
            {editName && <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder='Edit your name' style={styles.input} autoCompleteType='name' keyboardType='name-phone-pad' />
                <TouchableOpacity style={{ backgroundColor: '#fff', justifyContent: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                    <Ionicons name='checkmark-circle-outline' size={20} color='#B5C401' style={{ padding: 20 }} />
                </TouchableOpacity>
            </View>}
            <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                <Text style={{...styles.text, fontWeight: 'bold' }}>Email: </Text>
                <Text style={styles.text}>email@email.com </Text>
                <Ionicons name='create-outline' size={20} color='#B5C401' onPress={() => setEditEmail(!editEmail)} />
            </View>
            {editEmail && <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder='Edit your email' style={styles.input} autoCompleteType='email' autoCorrect={false} keyboardType='email-address' />
                <TouchableOpacity style={{ backgroundColor: '#fff', justifyContent: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
                    <Ionicons name='checkmark-circle-outline' size={20} color='#B5C401' style={{ padding: 20 }} />
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
