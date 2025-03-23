import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ChatScreen from '../screens/ChatScreen';
import PeopleScreen from '../screens/PeopleScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
  const Tabs = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tabs.Navigator>     
        <Tabs.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return focused ? (
                <Ionicons
                  name="chatbubble-outline"
                  color="#fff"
                  size={20}
                />
              ) : (
                <MaterialIcons
                  name="chat-bubble-outline"
                  color="#989898"
                  size={20}
                />
              );
            },
          }}
        />

        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: {backgroundColor: '#101010'},
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return focused ? (
                <Ionicons name="person-outline" color="#fff" size={20} />
              ) : (
                <Ionicons name="person-outline" color="#989898" size={20} />
              );
            },
          }}
        />
        {/* <Tabs.Screen name="Settings" component={Settings} /> */}
      </Tabs.Navigator>
    );
  }

  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}} />
        <Stack.Screen name="People" component={PeopleScreen} options={{headerShown:false}} />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
        <MainStack />
    </NavigationContainer>
  );
}
