import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070' }}>RECENT GAMES</Text>
            <Text style={{ fontSize: 17, fontStyle: 'italic', color: '#868686', paddingVertical: 15 }}>Filters</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <View style={{ width: 100, borderWidth: 2, borderColor: '#7F3992', paddingVertical: 5, borderRadius: 100, marginRight: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 'bold', color: '#7F3992' }}>Lotofácil</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ width: 100, borderWidth: 2, borderColor: '#01AC66', paddingVertical: 5, borderRadius: 100, marginRight: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 'bold', color: '#01AC66' }}>Mega-Sena</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{ width: 100, borderWidth: 2, borderColor: '#F79C31', paddingVertical: 5, borderRadius: 100, marginRight: 10, alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, fontStyle: 'italic', fontWeight: 'bold', color: '#F79C31' }}>Quina</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
})
