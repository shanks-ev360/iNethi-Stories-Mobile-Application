import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleIntethi from "../components/TitleInethi";
import Button from "../components/Button";

const { height } = Dimensions.get("window");

function Story({ route, navigation }) {
  const ip_address = "192.168.100.101";
  const [content, setContent] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const { id, title, content: routeContent } = route.params;

  useEffect(() => {
    setContent(routeContent);
  }, [routeContent]);

  async function downloadHandler() {
    const url = `http://${ip_address}:5000/stories/${id}/download`;
    const fileUri = FileSystem.documentDirectory + `${title}.html`;

    try {
      const fileMetadata = await FileSystem.getInfoAsync(fileUri);
      if (fileMetadata.exists) {
        Alert.alert(
          "Story download exists",
          "The story has already been downloaded.",
          [
            {
              text: "Go to downloads",
              onPress: () => navigation.navigate("Downloads"),
            },
            {
              text: "Delete story from downloads",
              onPress: () => deleteDownloadedStory(fileUri),
            },
            { text: "Continue reading" },
          ]
        );
        return;
      }

      setIsDownloading(true);
      const dloadResumable = FileSystem.createDownloadResumable(url, fileUri);
      const { uri } = await dloadResumable.downloadAsync();
      setIsDownloading(false);
      Alert.alert(
        "Download complete",
        "Story downloaded successfully and can be viewed in 'Downloaded Stories'",
        [
          {
            text: "Go to downloads",
            onPress: () => navigation.navigate("Downloads"),
          },
          { text: "Continue reading" },
        ]
      );

      const storyInformation = { id, title, uri };
      const downloadedStories = await AsyncStorage.getItem("downloadedStories");
      const stories = downloadedStories ? JSON.parse(downloadedStories) : [];
      stories.push(storyInformation);
      await AsyncStorage.setItem("downloadedStories", JSON.stringify(stories));

      // Increment the download count
      await incrementDownloadCount();
    } catch (e) {
      setIsDownloading(false);
      console.error(e);
      Alert.alert("Download failed", "Error downloading the file.");
    }
  }

  async function incrementDownloadCount() {
    try {
      const response = await fetch(
        `http://${ip_address}:5000/stories/${id}/downloads`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to increment download count");
      }
    } catch (error) {
      console.error("Error incrementing download count:", error);
    }
  }

  async function deleteDownloadedStory(fileUri) {
    try {
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

  function moreInfoButtonHandler() {
    console.log("More Information Button");
    navigation.navigate("MoreInfo");
  }

  const source = { html: content };

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
        allowFileAccessFromFileURLs={true}
        allowsInlineMediaPlayback={true}
        startInLoadingState={true}
      />
      <View style={styles.buttonsContainer}>
        {isDownloading ? (
          <Image
            source={require("../assets/downloading.gif")}
            style={styles.loadingGif}
          />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <Button onPress={downloadHandler}>Download</Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={moreInfoButtonHandler}>More Info</Button>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

export default Story;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loadingGif: {
    width: 50,
    height: 50,
  },
});
