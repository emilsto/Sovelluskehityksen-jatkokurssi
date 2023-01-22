import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import axios from 'axios';

import WeatherCard from '../components/WeatherCard';

const CurrentWeatherScreen = () => {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('helsinki');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          'https://weatherapi-com.p.rapidapi.com/forecast.json',
          {
            params: {q: city, days: '3'},
            headers: {
              'X-RapidAPI-Key':
                'ac04bf2660msh8787e6ecda958ddp19a5d4jsn923efe2a39f9',
              'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            },
          },
        );
        const data = await res.data;
        console.log(data);
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Current Weather</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <WeatherCard weather={weather} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnContainer: {
    flex: 3,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  bigText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CurrentWeatherScreen;
