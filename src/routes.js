import React from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home/index.js';
import Login from './pages/Login/index';
import SignUp from './pages/SignUp/index';
import SignUpContinue from './pages/SignUpContinue/index';
import ChooseProfile from './pages/ChooseProfile/index';
import Activites from './pages/Activites';
import Imagem from '../src/assets/Logo.svg';
import { Ionicons } from '@expo/vector-icons';
import UpdateProfile from './pages/UpdateProfile/index.js';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function Routes() {
    return (
    <Stack.Navigator>
      <Stack.Screen name="StackScreenNoHeader" options={{headerShown: false}} component={StackScreenNoHeader} />
      <Stack.Screen name="Home" component={Home} options={{
        //headerTitle: props => <LogoTitle {...props} />,
        headerTintColor: '#F2A54A',
        headerStyle: {
          backgroundColor: '#121515',
        },
      }} />
      <Stack.Screen name="Activites" component={Activites} options={{
        headerTitle: <Text style={{fontFamily: 'Dosis-Bold', color:'white', fontSize: 34, alignSelf: 'flex-start', marginRight: 10}}>Suas atividades</Text>,
        headerTintColor: '#F2A54A',
        headerStyle: {
          backgroundColor: '#121515',
        },
      }}/>
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#121515',
        },
        headerBackImage: () => <Ionicons name="close" color="white" size={28}/>
      }}/>
    </Stack.Navigator>
    );
}
//Screens without header
function StackScreenNoHeader(){
  return(
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignUpContinue" component={SignUpContinue} />
    <Stack.Screen name="ChooseProfile" component={ChooseProfile} />
  </Stack.Navigator>
  )
}

/*function TabScreens(){
  return(
    <Tab.Navigator


    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Points') {
          iconName = focused ? 'cash' : 'cash-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}

    tabBarOptions={{
      activeTintColor: '#F2A54A',
      inactiveTintColor: '#F2A54A',
        style: {
          backgroundColor: '#121515',
      },
    }}
  >
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  )
}*/




