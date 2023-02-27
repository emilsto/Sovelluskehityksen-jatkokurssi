import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const WeatherCard = ({item}) => {
  return (
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


export default WeatherCard;
