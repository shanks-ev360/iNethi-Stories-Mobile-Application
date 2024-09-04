import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import TitleIntethi from "../components/TitleInethi";
import StoryTile from "../components/StoryTile";
import Button from "../components/Button";
import { SelectList } from "react-native-dropdown-select-list";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertAsync from "react-native-alert-async";

function StoriesScreen({ route, navigation }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const ip_address = "inethistories-1.cs.uct.ac.za";
  const { category } = route.params;
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("Title");
  const [isFetching, setIsFetching] = useState(false);

  const sortOptions = [
    { key: "1", value: "Title" },
    { key: "2", value: "Views" },
    { key: "3", value: "Downloads" },
    { key: "4", value: "Likes" },
  ];

  async function fetchStories() {
    try {
      const response = await fetch(
        `https://${ip_address}/stories/${encodeURIComponent(category)}`
      );

      if (!response.ok) {
        const text = await response.text(); // Read the response as text
        console.error("Error response:", text);
        throw new Error("Network response issue");
      }

      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error("There was a problem fetching stories:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchStories();
  }, [category]);

  useFocusEffect(
    useCallback(() => {
      fetchStories();
    }, [])
  );

  async function selectStoryHandler(id, title, content) {
    //navigation.navigate("Story", { id, title, content });

    try {
      setIsFetching(true);
      await fetch(`https://${ip_address}/stories/${id}/view`, {
        method: "POST",
      });
    } catch (error) {
      setIsFetching(false);
      console.error("Error here", error);
    } finally {
      setIsFetching(false);
      navigation.navigate("Story", { id, title, content });
    }
  }

  async function downloadAllHandler() {
    setIsDownloading(true);
    console.log("Downlaod all");
    const response = await fetch(
      `https://${ip_address}/stories/${category}/downloadall`
    );

    const categoryStories = await response.json();
    for (let i = 0; i < categoryStories.length; i++) {
      await downloadStoryHandler(categoryStories.at(i));
    }
    setIsDownloading(false);

    await AlertAsync(
      "Downloads for " + category + " complete",
      "Stories downloaded successfully and can be viewed in 'Downloaded Stories'",
      [
        {
          text: "Go to downloads",
          onPress: () => navigation.navigate("Downloads"),
        },
        {
          text: "Stay in " + category,
        },
      ]
    );
  }

  async function downloadStoryHandler(story) {
    const url = `https://${ip_address}/stories/${story._id}/download`;
    const fileUri = FileSystem.documentDirectory + `${story.title}.html`;

    try {
      const fileMetadata = await FileSystem.getInfoAsync(fileUri);
      //Check if the story file has already been downloaded and prevents downloading the same stroy again.
      if (fileMetadata.exists) {
        await AlertAsync(
          "Story download exists (" + story.title + ")",
          "The story has already been downloaded.",
          [{ text: "Continue" }]
        );
        return;
      }

      setIsDownloading(true);
      const dloadResumable = FileSystem.createDownloadResumable(url, fileUri);
      const { uri } = await dloadResumable.downloadAsync();

      //const storyInformation = { id, title, uri };
      const storyInformation = {
        id: story._id,
        title: story.title,
        uri: fileUri,
      };
      const downloadedStories = await AsyncStorage.getItem("downloadedStories");
      const stories = downloadedStories ? JSON.parse(downloadedStories) : [];
      stories.push(storyInformation);
      await AsyncStorage.setItem("downloadedStories", JSON.stringify(stories));

      // Increment the download count
      await incrementDownloadCount(story._id);
    } catch (e) {
      console.error(e);
      Alert.alert("Download failed", "Error downloading the file.");
    }
  }

  //increase the download count fo the story in the database
  //Forms part of the file metadata
  async function incrementDownloadCount(id) {
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

  const createStoryTile = ({ item }) => (
    <StoryTile
      title={item.title}
      views={item.views}
      downloads={item.downloads}
      content={item.content}
      likes={item.likes}
      onPress={() => selectStoryHandler(item._id, item.title, item.content)}
    />
  );

  function sortStories(stories, sortBy) {
    // sortedStories = [...stories].sort((x, y) => x.title.localeCompare(y.val));
    return [...stories].sort((x, y) => {
      if (sortBy === "Title") {
        return x.title.localeCompare(y.title);
      } else if (sortBy === "Views") {
        return y.views - x.views;
      } else if (sortBy === "Likes") {
        return y.likes - x.likes;
      } else if (sortBy === "Downloads") {
        return y.downloads - x.downloads;
      }
    });
  }

  const sortedStories = sortStories(stories, sortOption);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.titleContainerLoading}>
          <TitleIntethi size={30}> {category} Stories </TitleIntethi>
        </View>
      ) : (
        <View style={styles.titleContainer}>
          <TitleIntethi size={30}> {category} Stories </TitleIntethi>
        </View>
      )}

      {loading ? (
        <View>
          <Image source={require("../assets/loading.gif")} />
        </View>
      ) : isFetching ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.listContainer}>
          {stories.length > 0 ? (
            <>
              <View style={styles.downloadButtonContainer}>
                <View style={styles.sortContainer}>
                  <View style={styles.sortText}>
                    <Text style={styles.sortText}>
                      {!isDownloading ? "Sort by..." : "Downloading stories..."}
                    </Text>
                  </View>

                  {!isDownloading && (
                    <View style={styles.sortBox}>
                      <SelectList
                        setSelected={setSortOption}
                        data={sortOptions}
                        save="value"
                        placeholder=""
                        search={false}
                      />
                    </View>
                  )}
                </View>

                {stories.length > 1 && !isDownloading ? (
                  <>
                    <Button onPress={downloadAllHandler}>Download All</Button>
                  </>
                ) : (
                  <></>
                )}
              </View>
              {isDownloading ? (
                <View style={styles.loadingGifBox}>
                  <Image
                    source={require("../assets/downloading.gif")}
                    style={styles.loadingGif}
                  />
                </View>
              ) : (
                <FlatList
                  data={sortedStories}
                  renderItem={createStoryTile}
                  keyExtractor={(item) => item._id}
                />
              )}
            </>
          ) : (
            <View style={styles.noStoriesContainer}>
              <Text style={styles.noStories}>No stories available for now</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default StoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    width: 300,
    justifyContent: "center",
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    borderColor: GlobalStyles.colors.primary800,
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 20,
  },
  titleContainerLoading: {
    width: 300,
    justifyContent: "center",
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    borderColor: GlobalStyles.colors.primary800,
    borderWidth: 2,
    marginBottom: 10,
    marginTop: 90,
  },
  downloadButtonContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    width: "80%",

    marginBottom: 20,
    borderBottomColor: GlobalStyles.colors.borderFade,
    borderBottomWidth: 4,
  },
  noStories: {
    fontSize: 18,
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    textAlign: "center",
  },
  noStoriesContainer: {
    padding: 50,
  },
  sortContainer: {
    flexDirection: "column",
  },
  sortText: { fontSize: 18, paddingLeft: 5 },
  loadingGif: { width: "50%", height: "30%" },
  loadingGifBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
