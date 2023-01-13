//component to handle the search of the weather

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const WeatherSearch = (props) => {
    const [city, setCity] = useState('Tap to search');

    return (
        <View style={styles.container}>
<TextInput style={styles.textInput} value={city} onChangeText={(newValue) => {setCity(newValue); props.onCityChange(newValue)}} onFocus={() => setCity("")}/>
</View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    textInput: {
        textAlign: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        fontSize: 25,
        margin: 10,
    },
});



export default WeatherSearch;