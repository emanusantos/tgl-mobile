import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import GameDisplay from '../components/GameDisplay';
import BetButton from '../components/BetButton';
import { BetResponse, GameResponse } from '../types/BetTypes';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/FormScreenTypes';
import { setId } from '../store/authSlice';
import axios from 'axios';

export default function Home({ navigation }: NativeStackScreenProps<RootStackParamList, 'Login'>): JSX.Element {
    const limit = useRef(3);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        userCheck();
        getGames();
        getBets();
    }, [navigation, currentPage])
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
        await axios.get(`http://10.0.0.103:3333/bets?page=${currentPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setBets(bets.concat(res.data.data));
            if (currentPage === 1) {
                dispatch(setId(res.data.data[0].user_id));
            };
            limit.current = res.data.page;
            setLoading(false);
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

    const moreBets = (): void => {
        if (currentPage > limit.current) {
            return;
        };

        setCurrentPage(currentPage + 1);
        setLoading(true);
    };

    const filteredData = bets.filter((bet: BetResponse) => bet.game.type === filters);

    const Footer = () => {
        return (
            loading ?
            <View>
                <ActivityIndicator size='large' />
            </View> : null
        );
    };

    const renderItem = ({ item }: any) => (
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
                    if (filters === button.type) {
                        bgc = color;
                        color = '#fff';
                    };
                    return (
                        <BetButton color={color} bgc={bgc} border={border} key={button.type} type={button.type} onPress={() => filterHandler(button.type)} />
                    );
                })}
            </View>
            <FlatList 
                showsVerticalScrollIndicator={false}
                keyExtractor={(bet, index) => index.toString()}
                style={{ marginTop: 20 }} 
                data={filters ? filteredData : bets} 
                ListFooterComponent={Footer}
                onEndReached={moreBets}
                onEndReachedThreshold={0.5}
                renderItem={memoizate}
            />
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
