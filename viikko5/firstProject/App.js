import React, { useState } from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import TodoFrame from "./components/TodoFrame";

import axios from "./api/axios";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("/users");
      setData(response.data);
    } catch (error) {
      if (error?.response?.status === 404) {
        setError("Resource was not found!");
        console.log(error);
      } else {
        setError(error.message);
      }
      console.log(error);
    }
  };

  const fetchDataHandler = () => {
    fetchData();
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Lets fetch some users!</Text>
      <Button title="Click Me" onPress={fetchDataHandler} />
      {error ? <Text>{error}</Text> : null}
      {data.map((item) => (
        <TodoFrame key={item.id} text={item.name} />
      ))}
    </View>
  );
};

export default App;

//stylessheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    fontSize: 20,
    color: "red",
  },
});
