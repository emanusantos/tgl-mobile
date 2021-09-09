import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import GameDisplay from '../components/GameDisplay';
import BetButton from '../components/BetButton';
import { BetResponse, GameResponse } from '../types/BetTypes';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/FormScreenTypes';
import { setId } from '../store/authSlice';
import axios from 'axios';

export default function Home({ navigation }: NativeStackScreenProps<RootStackParamList, 'Login'>): JSX.Element {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    useEffect(() => {
        userCheck();
        getGames();
        getBets();
    }, [navigation])
    const [games, setGames] = useState<GameResponse[]>([]);
    const [bets, setBets] = useState<BetResponse[]>([]);
    const [filters, setFilters] = useState<string | null>(null);

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

    const getBets = async (): Promise<void> => {
        await axios.get('http://10.0.0.103:3333/bets?page=1', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            alert(res.status);
            setBets(res.data.data);
            dispatch(setId(res.data.data[0].user_id));
        })
    };

    const userCheck = (): void => {
        if (!token) {
            navigation.navigate('Login');
        };
    };

    const filterHandler = (type: string): void => {
        if (filters === type) {
            return setFilters(null);
        };

        setFilters(type);
    };

    const filteredData = bets.filter((bet: BetResponse) => bet.game.type === filters);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070' }}>RECENT GAMES</Text>
            <Text style={{ fontSize: 17, fontStyle: 'italic', color: '#868686', paddingVertical: 15 }}>Filters</Text>
            <View style={{ flexDirection: 'row' }}>
                {games && games.map((button) => {
                    let color = button.color;
                    let bgc = '#fff';
                    let border = color;
                    if (filters === button.type) {
                        bgc = color;
                        color = '#fff';
                    };
                    return (
                        <BetButton color={color} bgc={bgc} border={border} key={button.type} type={button.type} onPress={() => filterHandler(button.type)} />
                    );
                })}
            </View>
            <ScrollView style={{ marginTop: 20 }}>
                {filters && filteredData.map((bet) => (
                    <GameDisplay key={bet.id} color={bet.game.color} numbers={bet.numbers} date={bet.created_at.substr(0, 10)} price={bet.price} type={bet.game.type} trash={false} />
                ))}

                {!filters && bets && bets.map((bet) => (
                    <GameDisplay key={bet.id} color={bet.game.color} numbers={bet.numbers} date={bet.created_at.substr(0, 10)} price={bet.price} type={bet.game.type} trash={false} />
                ))}
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
