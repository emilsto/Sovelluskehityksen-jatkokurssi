import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

import WeatherCard from '../components/WeatherCard';

const CurrentWeatherScreen = () => {
  const [state, setState] = useState({
    weather: {},
    city: 'Tampere',
    country: 'Finland',
    loading: false,
    currentLocation: {},
    error: null
  });

  useEffect(() => {
    const getCurrentLocation = async () => {
      Geolocation.getCurrentPosition(async info => {
        setState(prevState => ({ ...prevState, currentLocation: info }));

        try {
          setState(prevState => ({ ...prevState, loading: true }));

          const res = await axios.get(
            'https://weatherapi-com.p.rapidapi.com/forecast.json',
            {
              params: {
                q: `${info.coords.latitude},${info.coords.longitude}`,
                days: '1'
              },
              headers: {
                'X-RapidAPI-Key':
                  'ac04bf2660msh8787e6ecda958ddp19a5d4jsn923efe2a39f9',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
              }
            }
          );
          const data = res.data.forecast.forecastday;
          const city = res.data.location;
          setState(prevState => ({
            ...prevState,
            city: city.name,
            country: city.country,
            weather: data,
            loading: false,
            error: null // reset error state
          }));
        } catch (error) {
          console.log(error);
          setState(prevState => ({
            ...prevState,
            loading: false,
            error: 'An error occurred. Please try again later.' // update error state
          }));
        }
      });
    };

    getCurrentLocation();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Current Weather</Text>
      <Text style={styles.text}>{state.city} - {state.country}</Text>
      {state.loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
        data={state.weather}
        renderItem={({ item }) => <WeatherCard item={item} />}
      />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  locationContainer: {
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  city: {
    fontSize: 18,
  },
  forecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  forecastImage: {
    width: 50,
    height: 50,
  },
  bigText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});



export default CurrentWeatherScreen;
