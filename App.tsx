import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login';
import Home from './screens/Home';
import Account from './screens/Account';
import NewBetCart from './screens/NewBet';
import Cart from './components/Cart';
import FocusBar from './components/FocusBar';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

export default function App() {
  const RootStack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const CustomBetButton = ({ children, onPress }: { children: ReactNode, onPress?: ((e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined}) => (
    <TouchableOpacity activeOpacity={.8} onPress={onPress} style={{ top: -20, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 90, height: 90, borderWidth: 5, borderColor: '#fff', elevation: 10, backgroundColor: '#B5C300', padding: 15, borderRadius: 50 }}>{children}</View>
    </TouchableOpacity>
  );

  const HeaderTitle = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <View style={{ alignItems: 'center', paddingBottom: 15 }}>
        <Text style={{ color: '#707070', fontSize: 30, fontStyle: 'italic', fontWeight: 'bold' }}>TGL</Text>
        <View style={{ width: 70, height: 7, backgroundColor: '#B5C401', borderRadius: 6 }}></View>
      </View>
      <MaterialIcons name='logout' size={30} color='#C1C1C1' style={{ paddingBottom: 10 }} />
    </View>
  );

  const CartScreen = () => (
    <Drawer.Navigator>
      <Drawer.Screen name='Cart' component={Cart} />
    </Drawer.Navigator>
  );
  
  const TabScreens = () => (
    <Tabs.Navigator screenOptions={{ 
      tabBarShowLabel: false,  
      tabBarStyle: { height: 71.8, borderTopLeftRadius: 25, borderTopRightRadius: 25 } }}>
      <Tabs.Screen name='Home' component={Home} options={{ tabBarIcon: ({ focused }) => (
        <View style={{ alignItems: 'center' }}>
          {focused && <FocusBar />}
          <MaterialCommunityIcons name='home-outline' size={35} color={focused ? '#B5C401' : '#C1C1C1'} />
          <Text style={{...styles.label, color: focused ? '#707070' : '#C1C1C1', fontWeight: focused ? 'bold' : 'normal' }}>Home</Text>
        </View>
      ), headerTitle: () => (<HeaderTitle />) }} />
      <Tabs.Screen 
      name='Newbet' 
      component={NewBetCart} 
      options={{ tabBarIcon: () => (
          <Image source={require('./assets/newbeticon.png')} style={{ width: 55, height: 55 }} resizeMode='contain' />
      ), 
      tabBarButton: (props) => (<CustomBetButton {...props} />), 
      headerTitle: () => (<HeaderTitle />)}} />
      <Tabs.Screen name='Account' component={Account} options={{ tabBarIcon: ({ focused }) => (
        <View style={{ alignItems: 'center' }}>
          {focused && <FocusBar />}
          <Ionicons name='person-outline' size={30} color={focused ? '#B5C401' : '#C1C1C1'} />
          <Text style={{...styles.label, color: focused ? '#707070' : '#C1C1C1', fontWeight: focused ? 'bold' : 'normal' }}>Account</Text>
        </View>
      ), 
      headerTitle: () => (<HeaderTitle />) }} />
    </Tabs.Navigator>
  );

  const RootStackScreens = () => (
    <RootStack.Navigator>
      <RootStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <RootStack.Screen name='HomeTabs' component={TabScreens} options={{ headerShown: false }} />
      <RootStack.Screen name='Cart' component={CartScreen} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );

  return (
    <NavigationContainer>
      <RootStackScreens />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#C1C1C1',
    fontStyle: 'italic',
  },
})
