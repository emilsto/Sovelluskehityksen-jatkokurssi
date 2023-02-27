import React from 'react';
//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//screens
import CurrentWeatherScreen from './screens/CurrentWeatherScreen';
import WeatherForecastScreen from './screens/WeatherForecastScreen';
import { Text } from 'react-native';
//context

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Current weather" component={CurrentWeatherScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Text>
               🌞
            </Text>
          ),

        }}
        />
        <Tab.Screen name="Weather forecast" component={WeatherForecastScreen}
        options={{
          headerShown: false,
          tabBarIcon : ({color, size}) => (
            <Text>
              📅
            </Text>
          ),
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
