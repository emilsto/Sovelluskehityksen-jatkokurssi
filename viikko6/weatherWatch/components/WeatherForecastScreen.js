import {View, Text} from 'react-native';
import WeatherView from './WeatherView';

const WeatherForecastScreen = ({weather}) => {
    return (
        <View>
            <Text>Weather Forecast Screen</Text>
            <WeatherView weather={weather}/>
        </View>
    );
};

export default WeatherForecastScreen;