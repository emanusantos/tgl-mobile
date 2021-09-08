import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Account(): JSX.Element {
    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Text style={{ paddingTop: 30, paddingBottom: 20, fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#B5C401' }}>USER'S PROFILE:</Text>
            <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                <Text style={{...styles.text, fontWeight: 'bold' }}>Name: </Text>
                <Text style={styles.text}>User </Text>
                <Ionicons name='create-outline' size={20} color='#B5C401' />
            </View>
            <TextInput style={styles.input} placeholder='Edit your name' />
            <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
                <Text style={{...styles.text, fontWeight: 'bold' }}>Email: </Text>
                <Text style={styles.text}>email@email.com </Text>
                <Ionicons name='create-outline' size={20} color='#B5C401' />
            </View>
            <TextInput style={styles.input} placeholder='Edit your email' />
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
        width: 306,
        height: 70.8,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
})
