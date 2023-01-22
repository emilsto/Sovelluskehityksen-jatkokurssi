//Weather view component
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherView = ({weather}) => {        
    //weather.location.icon
    return (
        <View style={styles.container}>
            <View style={styles.columnContainer}>
                {weather && <Text style={styles.bigText}>{weather.location.name}, {weather.location.country}</Text>}
                {weather && <Image source={{uri: `https:${weather.current.condition.icon}`}} style={styles.image}/>}
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                    {weather && <Text style={styles.text}>🌡️ {weather.current.temp_c} °C</Text>}
                </View>
                <View style={styles.columnContainer}>
                    {weather && <Text style={styles.text}>💨 {weather.current.wind_kph} m/s</Text>}
                </View>
                <View style={styles.columnContainer}>
                {weather && <Text style={styles.text}>💨🧭 {weather.current.wind_dir}</Text>}
                </View>
            </View>
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
        fontSize: 15,
        textAlign: 'center',
        margin: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    columnContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 128,
        height: 128,
    },
    bigText : {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
    },
});

export default WeatherView;