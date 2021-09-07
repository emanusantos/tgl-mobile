import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GameDisplay from '../components/GameDisplay';
import BetButton from '../components/BetButton';

const numbers = '01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070' }}>RECENT GAMES</Text>
            <Text style={{ fontSize: 17, fontStyle: 'italic', color: '#868686', paddingVertical: 15 }}>Filters</Text>
            <View style={{ flexDirection: 'row' }}>
                <BetButton type='Lotofácil' color='#7F3992' />
                <BetButton type='Mega-Sena' color='#01AC66' />
                <BetButton type='Quina' color='#F79C31' />
            </View>
            <ScrollView style={{ marginTop: 20 }}>
                <GameDisplay numbers={numbers} color='#01AC66' date='07/09/2020' price={2.50} type='Mega-Sena' trash={false}  />
                <GameDisplay numbers={numbers} color='#01AC66' date='07/09/2020' price={2.50} type='Mega-Sena' trash={false}  />
                <GameDisplay numbers={numbers} color='#01AC66' date='07/09/2020' price={2.50} type='Mega-Sena' trash={false}  />
            </ScrollView>
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
