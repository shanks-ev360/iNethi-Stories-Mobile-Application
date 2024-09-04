import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  Text,
  Platform,
} from "react-native";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleIntethi from "../components/TitleInethi";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";

const { height } = Dimensions.get("window");

function Story({ route, navigation }) {
  const ip_address = "inethistories-1.cs.uct.ac.za";
  const [content, setContent] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [liked, setLiked] = useState(false);
  //const [numLikes, setNumLikes] = useState(0);

  const { id, title, content: routeContent, likes } = route.params;

  useEffect(() => {
    setContent(routeContent);
    checkStoryLiked(id);
  }, [routeContent]);

  //Check if the story has been liked by the user
  //Sets the like button to liked or not, and ensures that accurate like count is maintained.
  //Used to make sure user cannot like the story more than once, but also can unlike the story
  async function checkStoryLiked(id) {
    try {
      const idOfLikedStories = await AsyncStorage.getItem("idOfLikedStories");
      //console.log(idOfLikedStories);
      //console.log(id.toString());
      const stories = idOfLikedStories ? JSON.parse(idOfLikedStories) : [];
      //console.log(stories.includes(id));
      if (stories.includes(id.toString())) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.error("Error checking liked status:", error);
    }
  }

  //Download the current story to the users device.
  //Saved in app storage and in the devices filesystem.
  async function downloadStoryHandler() {
    const url = `https://${ip_address}/stories/${id}/download`;
    const fileUri = FileSystem.documentDirectory + `${title}.html`;

    try {
      const fileMetadata = await FileSystem.getInfoAsync(fileUri);
      //Check if the story file has already been downloaded and prevents downloading the same stroy again.
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

  //increase the download count fo the story in the database
  //Forms part of the file metadata
  async function incrementDownloadCount() {
    const response = await fetch(
      `https://${ip_address}/stories/${id}/downloads`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to increment download count");
    }
  }

  //increase/decrease the number of likes for the story in the database
  // part of the file metadata
  async function increaseLikes() {
    const response = await fetch(`https://${ip_address}/stories/${id}/like`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to increase like count");
    }
  }

  async function decreaseLikes() {
    const response = await fetch(`https://${ip_address}/stories/${id}/unlike`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to decrease like count");
    }
  }

  //delete the story from the device.
  //Takes the filepath (URL) of the story to delete and remove the story from the device
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

      Alert.alert("Deleted", "The story has been deleted from your device.", [
        {
          text: "Go to downloads",
          onPress: () => navigation.navigate("Downloads"),
        },
        { text: "Go home", onPress: () => navigation.navigate("Home") },
        { text: "Continue reading" },
      ]);
    } catch (e) {
      console.error("Error deleting file:", e);
      Alert.alert("Error", "Unable to delete the story.");
    }
  }

  async function likeUnlikeHandler() {
    const idOfLikedStories = await AsyncStorage.getItem("idOfLikedStories");
    const stories = idOfLikedStories ? JSON.parse(idOfLikedStories) : [];

    if (liked) {
      decreaseLikes();
      const updatedStories = stories.filter((storyId) => storyId !== id);
      await AsyncStorage.setItem(
        "idOfLikedStories",
        JSON.stringify(updatedStories)
      );
    } else {
      increaseLikes();
      stories.push(id);
      await AsyncStorage.setItem("idOfLikedStories", JSON.stringify(stories));
    }

    setLiked(!liked);
  }

  const source = { html: content };

  const scalesPage = Platform.OS === "ios";

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.titleContainer}>
          <TitleIntethi size={36}> {title} </TitleIntethi>
        </View>

        <View style={styles.likeButtonContainer}>
          {liked ? (
            <IconButton
              icon={"heart"}
              size={36}
              color={GlobalStyles.colors.like50}
              onPress={likeUnlikeHandler}
            />
          ) : (
            <IconButton
              icon={"heart-outline"}
              size={36}
              color={GlobalStyles.colors.primary500}
              onPress={likeUnlikeHandler}
            />
          )}
        </View>
      </View>

      <WebView
        source={source}
        domStorageEnabled={true}
        style={styles.webview}
        containerStyle={styles.webviewContainer}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccessFromFileURLs={true}
        allowsBackForwardNavigationGestures={true}
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
              <Button onPress={downloadStoryHandler}>Download</Button>
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

  webview: {
    borderRadius: 8,
    width: "100%",
  },
  webviewContainer: {
    borderColor: GlobalStyles.colors.primary400,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 4,
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
  headingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    flex: 5,
  },

  likeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "center",
    paddingRight: 2,
  },
});
