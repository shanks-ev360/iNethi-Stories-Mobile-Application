import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DownloadedTile from "../components/DownloadedTile";
import Button from "../components/Button";
import { GlobalStyles } from "../constants/styles";

function Downloads({ navigation }) {
  const [stories, setStories] = useState([]);

  async function deleteAllHandler() {
    Alert.alert(
      "Confirm",
      "Would you like to delete all downloaded stories? ",
      [
        {
          text: "Yes",
          onPress: deleteStories,
        },
        { text: "Cancel" },
      ]
    );
  }

  async function deleteStories() {
    console.log("del all");
    try {
      await AsyncStorage.removeItem("downloadedStories");
      setStories([]);
      const storyFiles = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );
      for (let i = 0; i < storyFiles.length; i++) {
        await FileSystem.deleteAsync(
          `${FileSystem.documentDirectory}${storyFiles.at(i)}`
        );
      }
      // for (const storyFile of storyFiles) {
      //   await FileSystem.deleteAsync(
      //     `${FileSystem.documentDirectory}${storyFile}`
      //   );
      //}
    } catch (error) {
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchDownloadedStories() {
        try {
          const storedStories = await AsyncStorage.getItem("downloadedStories");
          if (storedStories) {
            const parsedStories = JSON.parse(storedStories);
            //console.log("Fetched stories:", parsedStories);
            setStories(parsedStories);
          }
          //else {
          //console.log("No stories found in storage");
          //}
        } catch (error) {
          console.error(
            "Issue while fetching stories from AsyncStorage:",
            error
          );
          Alert.alert("Error", "Unable to fetch downloaded stories.");
        }
      }
      fetchDownloadedStories();
    }, [])
  );

  const renderItem = ({ item }) => (
    <DownloadedTile
      title={item.title}
      onPress={() =>
        navigation.navigate("DownloadedStory", {
          id: item.id,
          title: item.title,
          content: item.uri,
          isLocal: true,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      {stories.length === 0 ? (
        <>
          <Text style={styles.noDownloads}>No downloaded stories found.</Text>
          <Button onPress={() => navigation.navigate("Categories")}>
            Explore Categories
          </Button>
        </>
      ) : (
        <>
          <Button onPress={deleteAllHandler}>Delete All Stories</Button>
          <FlatList
            data={stories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
}

export default Downloads;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  clearButtonContainer: {
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
  },
  noDownloads: {
    fontSize: 30,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
    textAlign: "center",
  },
});
