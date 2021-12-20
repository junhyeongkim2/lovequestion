import "react-native-gesture-handler";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import List from "./src/List";
import Main from "./src/Main";
import question from "./src/question";

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="List"
            component={List}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="question"
            component={question}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
