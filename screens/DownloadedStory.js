import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  Text,
} from "react-native";
import TitleIntethi from "../components/TitleInethi";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

function DownloadedStory({ route, navigation }) {
  const [content, setContent] = useState("");
  const { id, title, content: routeContent, isLocal } = route.params;

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission needed for this",
            "You must grant access permissions to load the story."
          );
        }
      }
    };

    getPermissions();

    if (isLocal && routeContent) {
      loadLocalFile(routeContent);
    } else {
      setContent(routeContent); // Set content directly if not local
    }
  }, [routeContent]);

  async function loadLocalFile(fileUri) {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      setContent(fileContent);
    } catch (e) {
      console.error("Error reading file:", e);
      Alert.alert("Error", "Unable to load the local story.");
    }
  }

  async function deleteStoryHandler() {
    try {
      const fileUri = FileSystem.documentDirectory + `${title}.html`;
      await FileSystem.deleteAsync(fileUri, { idempotent: true });

      const downloadedStories = await AsyncStorage.getItem("downloadedStories");
      const stories = downloadedStories ? JSON.parse(downloadedStories) : [];
      const updatedStories = stories.filter((story) => story.id !== id);
      await AsyncStorage.setItem(
        "downloadedStories",
        JSON.stringify(updatedStories)
      );

      Alert.alert("Deleted", "The story has been deleted successfully.", [
        {
          text: "Go to downloads",
          onPress: () => navigation.navigate("Downloads"),
        },
        { text: "Go home", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (e) {
      console.error("Error deleting file:", e);
      Alert.alert("Error", "Unable to delete the story.");
    }
  }

  const formattedUri =
    Platform.OS === "android"
      ? `file://${
          routeContent.startsWith("file://")
            ? routeContent.slice(7)
            : routeContent
        }`
      : routeContent;

  const source = isLocal ? { uri: formattedUri } : { html: content };

  return (
    <View style={styles.container}>
      <TitleIntethi>{title}</TitleIntethi>

      <WebView
        originWhitelist={["*"]}
        source={source}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
        containerStyle={{ paddingHorizontal: 10 }}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowsInlineMediaPlayback={true}
        startInLoadingState={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
          Alert.alert("Error", "Unable to load the story.");
        }}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <View style={styles.iconButtonContainer}>
            <IconButton
              icon="trash"
              size={36}
              color={GlobalStyles.colors.error50}
              onPress={deleteStoryHandler}
            />
            <Text style={styles.deleteText}>Delete</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DownloadedStory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deleteText: {
    fontSize: 18,
    textAlign: "center",
    color: GlobalStyles.colors.error50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  webview: {
    borderRadius: 10,
    width: "100%",
  },
  buttonsContainer: {
    height: height * 0.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  iconButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
