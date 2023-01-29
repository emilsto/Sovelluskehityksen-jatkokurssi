import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const WeatherCard = ({weather}) => {
  return (
    <View style={styles.container}>
      <View style={styles.columnContainer}>
        {weather && (
          <Text style={styles.bigText}>
            {weather?.location?.name}, {weather?.location?.country}
          </Text>
        )}
        {weather && (
          <Image
            source={{uri: `https:${weather.current?.condition?.icon}`}}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          {weather && (
            <Text style={styles.text}>🌡️ {weather.current?.temp_c} °C</Text>
          )}
        </View>
        <View style={styles.columnContainer}>
          {weather && (
            <Text style={styles.text}>💨 {weather.current?.wind_kph} m/s</Text>
          )}
        </View>
        <View style={styles.columnContainer}>
          {weather && (
            <Text style={styles.text}>💨🧭 {weather.current?.wind_dir}</Text>
          )}
        </View>
      </View>
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
    flex: 1,
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

export default WeatherCard;
