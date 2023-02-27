import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet, Image, ToastAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

import WeatherCard from '../components/WeatherCard';


const WeatherForecastScreen = () => {
  const [state, setState] = useState({
    weather: {},
    city: '',
    country: '',
    loading: false,
    currentLocation: {},
    error: null,
    updateKey : 0
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
                days: '3'
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
          if (error.response && error.response.status === 404) {
            // handle 404 error
            setState(prevState => ({
              ...prevState,
              loading: false,
              error: 'City not found. Please try again.' 
            }));
          }
          else if( error.response && error.response.status === 429) {
            // handle 429 error
            setState(prevState => ({
              ...prevState,
              loading: false,
              error: 'Too many requests. Please try again later.'
            }));
          }
          else if( error.response && error.response.status === 403) {
              // handle 403 error
              setState(prevState => ({
                ...prevState,
                loading: false,
                error: 'Invalid API key. Please try again later.'
              }));
          }
          else if (error.message === 'Network Error') {
            // handle network error
            setState(prevState => ({
              ...prevState,
              loading: false,
              error: 'No internet connection. Please try again later.' 
            }));
          } else {
            // handle other errors
            console.log(error);
            setState(prevState => ({
              ...prevState,
              loading: false,
              error: 'An error occurred. Please try again later.' 
            }));
          }
        }
      })
    }
    getCurrentLocation();

  }, [state.updateKey]);

  const handleUpdate = () => {
    setState(prevState => ({
      ...prevState,
      updateKey: prevState.updateKey + 1 // increment updateKey to force update
    }));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3 Day Weather Forecast</Text>
      <Text style={styles.city}>
        {state?.city} - {state?.country}
      </Text>
      {state.error ? (
        <Text style={styles.error}>{state.error}</Text> // show error message
      ) : state.loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={state.weather}
          renderItem={({ item }) => <WeatherCard item={item} />}
        />
      )}
      <Button
        title="Update data"
        onPress={handleUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold'
  },
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
});

export default WeatherForecastScreen;

