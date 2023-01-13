import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import WeatherSearch from './components/WeatherSearch';
import WeatherView from './components/WeatherView';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');


  //handle button click
  const clickHandler = async () => {
      try {
        const res = await axios.get(
          "https://weatherapi-com.p.rapidapi.com/forecast.json",
          {
            params: { q: city, days: "3" },
            headers: {
              "X-RapidAPI-Key":
                "ac04bf2660msh8787e6ecda958ddp19a5d4jsn923efe2a39f9",
              "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
            },
          }
        );
        setWeather(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      clickHandler();
    }, [city]);

  return (
    <View
    style={[
      styles.container,
      {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: 'column',
      },
    ]}>
      <StatusBar style="auto" />
      <View style={{flex: 1, backgroundColor: 'grey' }}>
      <WeatherSearch onCityChange={(newCity) => setCity(newCity)} />
      </View>

      <View style={{flex: 3, backgroundColor: 'white'}}>
        <WeatherView weather={weather}/>
      </View>
      
      <View style={{flex: 2, backgroundColor: 'grey'}} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Update" onPress={clickHandler}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});