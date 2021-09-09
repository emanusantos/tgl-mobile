import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GameDisplay from '../components/GameDisplay';
import BetButton from '../components/BetButton';
import { GameResponse } from '../types/BetTypes';

const numbers: string = '01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03, 01, 02, 03';

export default function Home(): JSX.Element {
    useEffect(() => {
        getGames();
    }, [])
    const [games, setGames] = useState<GameResponse[]>([]);

    const getGames = async (): Promise<void> => {
        try {
            const url = 'http://10.0.0.103:3333/games';
            const games = await fetch(url);
            const gamesJSON = await games.json();
            setGames(gamesJSON);
        } catch (error) {
            alert(error);
        };
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070' }}>RECENT GAMES</Text>
            <Text style={{ fontSize: 17, fontStyle: 'italic', color: '#868686', paddingVertical: 15 }}>Filters</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text>botoes</Text>
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
