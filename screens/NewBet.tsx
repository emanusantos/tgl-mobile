import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerScreenProps, useDrawerStatus } from '@react-navigation/drawer';
import Cart from '../components/Cart';
import BetButton from '../components/BetButton';
import SelectedNumber from '../components/SelectedNumber';
import { RootStackParamList } from '../types/FormScreenTypes';
import { Game, GameResponse } from '../types/BetTypes';

const cartDrawer = createDrawerNavigator();
let currentGameRange: number[] = [];

function NewBet({ navigation }: DrawerScreenProps<RootStackParamList>): JSX.Element {
    const drawer = useDrawerStatus();
    const [opacity, setOpacity] = useState<number>(1);
    const [choseNumbers, setChoseNumbers] = useState<number[]>([]);
    const [data, setData] = useState<GameResponse[]>([]);

    useEffect(() => {
        getGames();
    }, []);

    useEffect(() => {
        if (drawer === 'open') {
            return setOpacity(.2);
        };

        if (drawer === 'closed') {
            return setOpacity(1);
        };
    }, [navigation, drawer]);

    const getGames = async (): Promise<void> => {
        const url = 'http://localhost:3333/games';
        const games = await fetch(url);
        const gamesJSON = await games.json();
        setData(gamesJSON.data);
    };

    const rangeHandler = (range: number): void => {
        for (let i = 1; i <= range; i++) {
            currentGameRange.push(i);
        };
    };

    const numberAlreadyExists = (array: number[], number: number) => {
        return array.some((index) => {
            return index === number;
        });
    };

    const selectNumber = (number: number): void => {
        if (numberAlreadyExists(choseNumbers!, number)) {
            const array = removeNumber(choseNumbers!, number);
            return setChoseNumbers(array);
        }
    
        setChoseNumbers([...choseNumbers!, number])
    };

    const removeNumber = (array: number[], number: number) => {
        return (array = array.filter((num) => {
            return num !== number;
        }));
    };

    return (
        <View style={{...styles.container, opacity: opacity}}>
            <View>
                <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070' }}>NEW BET FOR</Text>
                <Text style={{ fontSize: 17, fontStyle: 'italic', color: '#868686', paddingVertical: 15 }}>Choose a game</Text>
                <View style={{ flexDirection: 'row' }}>
                    <BetButton type='Lotofácil' color='#7F3992' onPress={rangeHandler(50)} />
                    <BetButton type='Mega-Sena' color='#01AC66' />
                    <BetButton type='Quina' color='#F79C31' />
                </View>
                <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 17, color: '#868686', paddingBottom: 2 }}>Fill your bet</Text>
                    <Text style={{ fontSize: 14, color: '#868686', fontStyle: 'italic', maxWidth: 300 }}>Mark as many numbers as you want up to a maximum of 50. Win by hitting 15, 16, 17, 18, 19, 20 or none of the 20 numbers drawn.</Text>
                </View>
                <View style={{ width: 36, height: 6, backgroundColor: '#C1C1C1', margin: 10, borderRadius: 6, alignSelf: 'center' }}></View>
                <ScrollView contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', paddingBottom: 200 }}>
                    {currentGameRange && currentGameRange.map((num, i) => {
                        let selected = false;
                        if (choseNumbers.includes(num)) selected = true;
                        let bgc = selected ? 'red' : '#ADC0C4';
                        return (
                            <SelectedNumber bgc={bgc} onPress={() => selectNumber(num)} number={num} key={i} />
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

const NewBetCart = (): JSX.Element => (
    <cartDrawer.Navigator drawerContent={Cart} screenOptions={{ drawerStyle: { width: '60%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }, drawerPosition: 'right', swipeEnabled: false }}>
        <cartDrawer.Screen name='Cart' component={NewBet} options={{ headerShown: false, sceneContainerStyle: { opacity: 1 }, overlayColor: 'rgba(0, 0, 0, 0.02)'} } />
    </cartDrawer.Navigator>
);

export default NewBetCart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 25,
    },
})
