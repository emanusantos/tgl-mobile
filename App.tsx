import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login';
import Home from './screens/Home';
import Account from './screens/Account';
import NewBet from './screens/NewBet';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function App() {
  const RootStack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();

  const CustomBetButton = ({ children, onPress }: any) => (
    <TouchableOpacity onPress={onPress} style={{ top: -20, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 90, height: 90, borderWidth: 5, borderColor: '#fff', elevation: 10, backgroundColor: '#B5C300', padding: 15, borderRadius: 50 }}>{children}</View>
    </TouchableOpacity>
  );
  
  const TabScreens = () => (
    <Tabs.Navigator screenOptions={{ 
      tabBarShowLabel: false,  
      tabBarStyle: { height: 71.8, borderTopLeftRadius: 25, borderTopRightRadius: 25 } }}>
      <Tabs.Screen name='Home' component={Home} options={{ tabBarIcon: ({ focused }) => (
        <View style={{ alignItems: 'center' }}>
          <MaterialCommunityIcons name='home-outline' size={35} color={focused ? '#B5C401' : '#C1C1C1'} />
          <Text style={{...styles.label, color: focused ? '#707070' : '#C1C1C1', fontWeight: focused ? 'bold' : 'normal' }}>Home</Text>
        </View>
      ) }} />
      <Tabs.Screen 
      name='Newbet' 
      component={NewBet} 
      options={{ tabBarIcon: ({ focused }) => (
          <Image source={require('./assets/newbeticon.png')} style={{ width: 55, height: 55 }} resizeMode='contain' />
      ), 
      tabBarButton: (props) => (<CustomBetButton {...props} />)}} />
      <Tabs.Screen name='Account' component={Account} options={{ tabBarIcon: ({ focused }) => (
        <View style={{ alignItems: 'center' }}>
          <Ionicons name='person-outline' size={30} color={focused ? '#B5C401' : '#C1C1C1'} />
          <Text style={{...styles.label, color: focused ? '#707070' : '#C1C1C1', fontWeight: focused ? 'bold' : 'normal' }}>Account</Text>
        </View>
      ) }} />
    </Tabs.Navigator>
  );

  const RootStackScreens = () => (
    <RootStack.Navigator initialRouteName='Home'>
      <RootStack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <RootStack.Screen name='Home' component={TabScreens} options={{ headerShown: false }} />
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
    color: '#C1C1C1',
    fontStyle: 'italic',
  },
})
