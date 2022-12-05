import React from "react";
import { View, Text } from "react-native";

const TodoFrame = (props) => {
  return (
    <View key={1}>
      <Text> {props.text}</Text>
    </View>
  );
};

export default TodoFrame;
