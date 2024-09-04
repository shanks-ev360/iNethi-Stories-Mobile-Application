import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import CategoryScreen from "../screens/CategoryScreen";
import AboutScreen from "../screens/AboutScreen";
import StoriesScreen from "../screens/StoriesScreen";
import Story from "../screens/Story";

import DownloadedStory from "../screens/DownloadedStory";
import Downloads from "../screens/Downloads";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoryScreen}
          options={({ navigation }) => ({
            title: "",
            headerRight: () => (
              <IconButton
                icon="home"
                size={24}
                color={GlobalStyles.colors.primary500}
                onPress={() => navigation.navigate("Home")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Stories"
          component={StoriesScreen}
          options={({ navigation }) => ({
            title: "",
            headerRight: () => (
              <IconButton
                icon="home"
                size={24}
                color={GlobalStyles.colors.primary500}
                onPress={() => navigation.navigate("Home")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Story"
          component={Story}
          options={({ navigation }) => ({
            title: "",
            headerRight: () => (
              <IconButton
                icon="home"
                size={24}
                color={GlobalStyles.colors.primary500}
                onPress={() => navigation.navigate("Home")}
              />
            ),
          })}
        />

        <Stack.Screen
          name="Downloads"
          component={Downloads}
          options={{ title: "Downloaded Stories" }}
        />
        <Stack.Screen
          name="DownloadedStory"
          component={DownloadedStory}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
