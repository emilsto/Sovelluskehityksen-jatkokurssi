import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {accelerometer} from 'react-native-sensors';

const App = () => {
  const [level, setLevel] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      setY(y);
      if (y > -0.1 && y < 0.1) {
        setLevel(1);
      } else {
        setLevel(0);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={[styles.container, level ? styles.level : styles.notLevel]}>
      <Text> Level: {level ? 'Yes' : 'No'} </Text>
      <Text>Y: {y}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  level: {
    backgroundColor: 'green'
  },
  notLevel: {
    backgroundColor: 'white'
  }
});

export default App;
