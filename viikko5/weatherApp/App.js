import { TextInput, View, Text, StyleSheet, Button, Image } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //handle button click
  const clickHandler = async () => {
    if (city === "") {
      setError(true);
      setErrorMessage("Enter a city name");
    } else {
      console.log(city);
      try {
        const res = await axios.get(
          "https://weatherapi-com.p.rapidapi.com/forecast.json",
          {
            params: { q: city, days: "3" },
            headers: {
              "X-RapidAPI-Key":
                "ac04bf2660msh8787e6ecda958ddp19a5d4jsn923efe2a39f9",
              "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
            },
          }
        );
        setError(false);
        setWeather(res.data);
        console.log(res.data);
      } catch (error) {
        setError(true);
        setErrorMessage("City not found");
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Email"
        placeholder="Enter a city name"
        value={city}
        onChangeText={(city) => setCity(city)}
      />

      <Button
        title="Get weather"
        style={styles.buttons}
        onPress={clickHandler}
      ></Button>

      <Text style={styles.error}>{error ? errorMessage : ""}</Text>
      {weather.length != [] ? (
        <View>
          <Text style={styles.text}>
            Current weather in {weather.location.name}:
          </Text>
          <Text style={styles.tempTxt}>{weather.current.temp_c} °C</Text>
          <Text>{weather.current.condition.text}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    fontSize: 18,
    width: "90%",
  },
  buttons: {},
  error: {
    color: "red",
  },
  tempTxt: {
    fontSize: 48,
  },
  text: {
    fontSize: 24,
  },
  weatherContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
