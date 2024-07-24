import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { GlobalStyles } from "../constants/styles";

import IconButton from "../components/IconButton";
import Home from "../screens/Home";
import CategoryScreen from "../screens/CategoryScreen";
import AboutScreen from "../screens/AboutScreen";
import StoriesScreen from "../screens/StoriesScreen";
import Story from "../screens/Story";
import MoreInfo from "../screens/MoreInfo";
import DownloadedStory from "../screens/DownloadedStory";
import Downloads from "../screens/Downloads";

const Stack = createStackNavigator();

function StackNavigator({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Categories"
          component={CategoryScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Stories"
          component={StoriesScreen}
          options={{ title: "" }}
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
          name="MoreInfo"
          component={MoreInfo}
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
        {/* <Stack.Screen
          name="CategoryControl"
          component={CategoryControl}
          options={{ title: "Edit Categories" }}
        /> */}
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
