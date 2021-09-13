import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import GameDisplay from '../components/GameDisplay';
import BetButton from '../components/BetButton';
import { BetResponse, GameResponse } from '../types/BetTypes';
import { useAppSelector } from '../hooks/reduxHooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/FormScreenTypes';
import axios from 'axios';

export default function Home({ navigation }: NativeStackScreenProps<RootStackParamList, 'Login'>): JSX.Element {
    const limit = useRef(3);
    const token = useAppSelector(state => state.auth.token);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        userCheck();
        getGames();
        getBets();
    }, [currentPage]);

    useEffect(() => {
        navigation.addListener('focus', () => {
            getBets();
        });
    });

    const [games, setGames] = useState<GameResponse[]>([]);
    const [bets, setBets] = useState<BetResponse[]>([]);
    const [filters, setFilters] = useState<string[]>([]);

    const getGames = async (): Promise<void> => {
        try {
            const url = 'http://192.168.0.7:3333/games';
            const games = await fetch(url);
            const gamesJSON = await games.json();
            setGames(gamesJSON);
        } catch (error) {
            alert(error);
        };
    };

    const getBets = async (): Promise<void> => {
        await axios.get(`http://192.168.0.7:3333/bets?page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setBets(bets.concat(res.data.data));
            limit.current = res.data.lastPage;
            setLoading(false);
        }).catch(err => {
            alert(err.message);
        })
    };

    const userCheck = (): void => {
        if (!token) {
            navigation.navigate('Login');
        };
    };

    const filterHandler = (type: string): void => {
        if (filters.includes(type)) {
            const newArr = filters.filter((types: string) => types !== type);
            return setFilters(newArr);
        };

        setFilters([...filters, type]);
    };

    const moreBets = (): void => {
        if (currentPage > limit.current) {
            return;
        };

        return setCurrentPage(currentPage + 1);
    };

    const filteredData = bets.filter((bet: BetResponse) => filters.includes(bet.game.type) ? bet.game.type : null);

    const Footer = () => {
        return (
            loading ?
            <View>
                <ActivityIndicator size='large' />
            </View> : null
        );
    };

    const renderItem = ({ item }: { item: BetResponse }) => (
            <GameDisplay
                color={item.game.color} 
                numbers={item.numbers} 
                date={item.created_at.substr(0, 10)} 
                price={item.price} 
                type={item.game.type}
                trash={false} 
            />
    );

    const memoizate = useMemo(() => renderItem, [bets, filters]);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070' }}>RECENT GAMES</Text>
            <Text style={{ fontSize: 17, fontStyle: 'italic', color: '#868686', paddingVertical: 15 }}>Filters</Text>
            <View style={{ flexDirection: 'row' }}>
                {games && games.map((button) => {
                    let color = button.color;
                    let bgc = '#fff';
                    let border = color;
                    let hasClose = false;
                    if (filters.includes(button.type)) {
                        hasClose = true;
                        bgc = color;
                        color = '#fff';
                    };
                    return (
                        <BetButton 
                        color={color} 
                        bgc={bgc} 
                        border={border} 
                        key={button.type} 
                        type={button.type} 
                        onPress={() => filterHandler(button.type)} hasClose={hasClose} />
                    );
                })}
            </View>
            {bets.length === 0 
            ? <Text style={{ fontSize: 16, fontStyle: 'italic', paddingTop: 100 }}>Seems like you don't have any bet yet. Don't waste your time, start betting now!</Text> 
            : <FlatList 
                showsVerticalScrollIndicator={false}
                keyExtractor={(bet, index) => index.toString()}
                style={{ marginTop: 20 }} 
                data={filteredData.length === 0 ? bets : filteredData}
                ListFooterComponent={Footer}
                onEndReached={moreBets}
                onEndReachedThreshold={0.5}
                renderItem={memoizate}
            />}
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
