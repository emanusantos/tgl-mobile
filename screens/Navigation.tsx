import React, { ReactNode } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Account from '../screens/Account';
import NewBetCart from '../screens/NewBet';
import Cart from '../components/Cart';
import FocusBar from '../components/FocusBar';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HeaderTitle from '../components/HeaderTitle';

const RootStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomBetButton = ({ children, onPress }: { children: ReactNode, onPress?: ((e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined}) => (
    <TouchableOpacity activeOpacity={.8} onPress={onPress} style={{ top: -20, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 90, height: 90, borderWidth: 5, borderColor: '#fff', elevation: 10, backgroundColor: '#B5C300', padding: 15, borderRadius: 50 }}>{children}</View>
    </TouchableOpacity>
);

const CartScreen = () => (
    <Drawer.Navigator>
      <Drawer.Screen name='Cart' component={Cart} />
    </Drawer.Navigator>
);
  
const TabScreens = ({ navigation }: any) => (
    <Tabs.Navigator screenOptions={{ 
      tabBarShowLabel: false,  
      tabBarStyle: { height: 71.8, borderTopLeftRadius: 25, borderTopRightRadius: 25 } }}>
      <Tabs.Screen name='Home' component={Home} options={{ tabBarIcon: ({ focused }) => (
        <View style={{ alignItems: 'center' }}>
          {focused && <FocusBar />}
          <MaterialCommunityIcons name='home-outline' size={35} color={focused ? '#B5C401' : '#C1C1C1'} />
          <Text style={{...styles.label, color: focused ? '#707070' : '#C1C1C1', fontWeight: focused ? 'bold' : 'normal' }}>Home</Text>
        </View>
      ), headerTitle: () => (<HeaderTitle navigation={navigation} />) }} />
      <Tabs.Screen 
      name='Newbet' 
      component={NewBetCart} 
      options={{ headerShown: false, tabBarIcon: () => (
          <Image source={require('../assets/newbeticon.png')} style={{ width: 55, height: 55 }} resizeMode='contain' />
      ), 
      tabBarButton: (props) => (<CustomBetButton {...props} />) 
     }} />
      <Tabs.Screen name='Account' component={Account} options={{ tabBarIcon: ({ focused }) => (
        <View style={{ alignItems: 'center' }}>
          {focused && <FocusBar />}
          <Ionicons name='person-outline' size={30} color={focused ? '#B5C401' : '#C1C1C1'} />
          <Text style={{...styles.label, color: focused ? '#707070' : '#C1C1C1', fontWeight: focused ? 'bold' : 'normal' }}>Account</Text>
        </View>
      ), 
      headerTitle: () => (<HeaderTitle navigation={navigation} />) }} />
    </Tabs.Navigator>
);

export const RootStackScreens = () => (
    <RootStack.Navigator>
      <RootStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <RootStack.Screen name='HomeTabs' component={TabScreens} options={{ headerShown: false }} />
      <RootStack.Screen name='Cart' component={CartScreen} options={{ headerShown: false }} />
    </RootStack.Navigator>
);

const styles = StyleSheet.create({
    label: {
      fontSize: 16,
      color: '#C1C1C1',
      fontStyle: 'italic',
    },
});