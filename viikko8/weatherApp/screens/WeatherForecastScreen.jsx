import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet, Image, ToastAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const WeatherForecastScreen = () => {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('Tampere');
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});


  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setCurrentLocation(info);
      ToastAndroid.showWithGravity('Coordinates fetched successfully!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    });
  };


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
        const data = await res.data.forecast.forecastday;
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
      <Text style={styles.title}>3 Day Weather Forecast</Text>
      <Text style={styles.city}>{city}</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={weather}
          renderItem={({item}) => (
            <View style={styles.forecast}>
              <View style={styles.forecastData}>
                <Text style={{fontWeight: 'bold'}}>{item.date}</Text>
                <Text>High: {item.day.maxtemp_c} °C</Text>
                <Text>Low: {item.day.mintemp_c} °C</Text>
                <Text>{item.day.condition.text}</Text>
              </View>
              <View style={styles.forecastImageContainer}>
                <Image
                  source={{uri: 'http:' + item.day.condition.icon}}
                  style={styles.forecastImage}
                />
              </View>
            </View>
          )}
        />
      )}
        {currentLocation.coords && (
          <View style={styles.locationContainer}>
            <Text>Current location</Text>
            <Text>Long: {currentLocation.coords.latitude}</Text>
            <Text>Lat: {currentLocation.coords.longitude}</Text>
            </View>
            )}
      <Button title="Get current location" onPress={() => getCurrentLocation()} />
      <Button title="Change city" onPress={() => setCity('Helsinki')} />

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
});

export default WeatherForecastScreen;

