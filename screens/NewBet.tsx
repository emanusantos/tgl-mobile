import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerScreenProps, useDrawerStatus } from '@react-navigation/drawer';
import Cart from '../components/Cart';
import BetButton from '../components/BetButton';
import SelectedNumber from '../components/SelectedNumber';
import { RootStackParamList } from '../types/FormScreenTypes';
import { Game, GameResponse, Bet } from '../types/BetTypes';
import { Ionicons } from '@expo/vector-icons';
import HeaderTitle from '../components/HeaderTitle';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { addBet, incrementTotal } from '../store/cartSlice';

const cartDrawer = createDrawerNavigator();
let currentGameRange: number[] = [];
let gameid: number;
let total = Number(0);

function NewBet({ navigation }: DrawerScreenProps<RootStackParamList>): JSX.Element {
    const dispatch = useAppDispatch();
    const drawer = useDrawerStatus();
    const cleaner = useAppSelector(state => state.cart.isCleanedUp);
    const [opacity, setOpacity] = useState<number>(1);
    const [choseNumbers, setChoseNumbers] = useState<number[]>([]);
    const [data, setData] = useState<GameResponse[]>([]);
    const [game, setGame] = useState<Game>({
        type: '',
        description: '',
        range: 0,
        price: 0,
        max_number: 0,
        color: '',
        min_cart_value: 0
    });

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
    }, [navigation, drawer, cleaner]);

    useEffect(() => {
        if (cleaner === true) {
            navigation.closeDrawer();
            navigation.navigate('Home');
        };
    }, [cleaner]);

    const getGames = async (): Promise<void> => {
        try {
            const url = 'http://192.168.0.7:3333/games';
            const games = await fetch(url);
            const gamesJSON = await games.json();
            setData(gamesJSON);
        } catch (error) {
            alert(error);
        };
    };

    const updateGameType = (e: string) => {
        if (e === game.type) {
            return;
        };

        if (e === 'Lotofácil') {
            currentGameRange = [];
            setGame(data[0]);
            gameid = data[0].id;
            rangeHandler(data[0].range);
            setChoseNumbers([])
        };

        if (e === 'Mega-Sena') {
            currentGameRange = [];
            setGame(data[1])
            gameid = data[1].id;
            rangeHandler(data[1].range);
            setChoseNumbers([])
        };

        if (e === 'Quina') {
            currentGameRange = [];
            setGame(data[2])
            gameid = data[2].id;
            rangeHandler(data[2].range);
            setChoseNumbers([])
        };
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
        };

        if (choseNumbers!.length >= game['max_number']) {
            alert(`You've reached the number limit of this bet (${game['max_number']})`);
            return;
        };
    
        setChoseNumbers([...choseNumbers!, number])
    };

    const removeNumber = (array: number[], number: number) => {
        return (array = array.filter((num) => {
            return num !== number;
        }));
    };

    const handleRemove = (number: number) => {
        const array = removeNumber(choseNumbers!, number);
        return setChoseNumbers(array);
    };

    const clearGame = (): void => {
        setChoseNumbers([]);
    };

    const getRandomGame = () => {
        let amount = game['max_number'] - choseNumbers!.length;
        let array: number[] = [];
        if (amount === 0) {
            const randomizedNumbers = generateNumbers(game['max_number'], game.range, array);
            return setChoseNumbers([...randomizedNumbers])
        }
        const randomizedNumbers = generateNumbers(amount, game.range, choseNumbers!);
        setChoseNumbers([...randomizedNumbers]);
    };

    const generateNumbers = (amount: number, range: number, array: number[]) => {
        clearGame();
        const getRandomNumbers = (max: number) => {
            return Math.ceil(Math.random() * max);
        };
        
        for (let i = 1; i <= amount; i++) {
            const number = getRandomNumbers(range)
            if (numberAlreadyExists(array, number)) {
              i--
            } else {
              array.push(number)
            }
          }
          return array
    };

    const formatNumbers = (): string => {
        let display = '';
        choseNumbers!.sort((a: number, b: number) => a - b).forEach((item: number, index: number) => {
            if (index !== choseNumbers!.length - 1) {
                display += `${item < 10 ? `0${item}` : item}, `
            } else {
                display += item
            }
        })
        return display;
    };

    const addItemToCart = (): void => {
        if (choseNumbers!.length < game['max_number']) {
            alert(`You need to select ${game['max_number'] - choseNumbers.length} more numbers to procceed with a ${game.type} bet.`);
            return;
        };

        total += game.price;
        dispatch(addBet({ id: Date.now().toString(), game_id: gameid, numbers: formatNumbers(), price: game.price, color: game.color, type: game.type }));
        dispatch(incrementTotal(game.price));
        navigation.openDrawer();
        clearGame();
    };

    return (
        <>
        <HeaderTitle navigation={navigation} paddingH={15} paddingV={20} opacity={opacity} />
        {choseNumbers.length > 0 ? <Ionicons onPress={() => navigation.openDrawer()} name='cart-outline' size={35} color='#B5C401' style={{ position: 'absolute', right: 60, top: 30 }} /> : null}
        <View style={{...styles.container, opacity: opacity}}>
            <View>
                <Text style={{ fontSize: 22, fontStyle: 'italic', fontWeight: 'bold', color: '#707070' }}>NEW BET {game.type && `FOR ${game.type.toUpperCase()}`}</Text>
                <Text style={{ fontSize: 17, fontStyle: 'italic', color: '#868686', paddingVertical: 15 }}>Choose a game</Text>
                <View style={{ flexDirection: 'row' }}>
                    {data && data.map((button) => {
                        let color = button.color;
                        let bgc = '#fff';
                        let border = color;
                        if (game.type === button.type) {
                            bgc = color;
                            color = '#fff';
                            border = '#fff';
                        }
                        return (
                            <BetButton 
                                border={border} 
                                bgc={bgc} 
                                color={color} 
                                type={button.type} 
                                key={button.id} 
                                onPress={() => updateGameType(button.type)} 
                            />
                        );
                    })}
                </View>

               {game.description && choseNumbers.length === 0 ? <View style={{ paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 17, color: '#868686', paddingBottom: 2 }}>Fill your bet</Text>
                    <Text style={{ fontSize: 14, color: '#868686', fontStyle: 'italic', maxWidth: 300 }}>{game.description}</Text>
                </View> : null}
                {choseNumbers ? 
                <View style={{ flexDirection: 'row', padding: 10, flexWrap: 'wrap' }}>
                    {choseNumbers.map((num, i) => 
                    <SelectedNumber onPress={() => handleRemove(num)} number={num} key={i} bgc={game.color} size={13} fontSize={12} hasX={true} />)}
                </View>
                : null}

                {choseNumbers.length > 0 ? 
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <TouchableOpacity onPress={getRandomGame} style={{ borderWidth: 1, borderColor: '#B5C401', borderRadius: 4, padding: 5, marginRight: 10 }}>
                        <Text style={{ color: '#B5C401', fontWeight: 'bold', fontSize: 13 }}>Complete game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clearGame} style={{ borderWidth: 1, borderColor: '#B5C401', borderRadius: 4, padding: 5, marginRight: 10 }}>
                        <Text style={{ color: '#B5C401', fontWeight: 'bold', fontSize: 13 }}>Clear game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addItemToCart} style={{ backgroundColor: '#B5C401', borderRadius: 4, padding: 5, width: '35%', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 13 }}><Ionicons name='cart-outline' size={20} color='#fff' />  Add to cart</Text>
                    </TouchableOpacity>
                </View> : null}

                {game.type ? <View style={{ width: 36, height: 6, backgroundColor: '#C1C1C1', margin: 10, borderRadius: 6, alignSelf: 'center' }}></View> : null}
                <ScrollView contentContainerStyle={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', paddingBottom: 250, height: 'auto' }}>
                    {currentGameRange ? currentGameRange.map((num, i) => {
                        let selected = false;
                        if (choseNumbers.includes(num)) selected = true;
                        let bgc = selected ? game.color : '#ADC0C4';
                        return (
                            <SelectedNumber 
                                bgc={bgc} 
                                onPress={() => selectNumber(num)} 
                                number={num} 
                                key={i} 
                                size={20} 
                                fontSize={18} 
                            />
                        )
                    }) : null}
                </ScrollView>
            </View>
        </View>
        </>
    );
};

const NewBetCart = (): JSX.Element => (
    <cartDrawer.Navigator drawerContent={props => <Cart {...props} />} screenOptions={{ drawerStyle: { width: '60%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }, drawerPosition: 'right', swipeEnabled: false }}>
        <cartDrawer.Screen name='NewBet' component={NewBet} options={{ headerShown: false, sceneContainerStyle: { opacity: 1 }, overlayColor: 'rgba(0, 0, 0, 0.02)'} } />
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
