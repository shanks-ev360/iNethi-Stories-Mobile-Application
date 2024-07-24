import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { GlobalStyles } from "../constants/styles";
import TitleIntethi from "../components/TitleInethi";
import StoryTile from "../components/StoryTile";
import Button from "../components/Button";

function StoriesScreen({ route, navigation }) {
  const ip_address = "192.168.100.101";
  const { category } = route.params;
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          `http://${ip_address}:5000/stories/${encodeURIComponent(category)}`
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
    };

    fetchStories();
  }, [category]);

  async function selectStoryHandler(id, title, content) {
    navigation.navigate("Story", { title, content });

    try {
      await fetch(`http://${ip_address}:5000/stories/${id}/view`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error here", error);
    } finally {
      navigation.navigate("Story", { id, title, content });
    }
  }

  const renderStoryItem = ({ item }) => (
    <StoryTile
      title={item.title}
      views={item.views}
      downloads={item.downloads}
      content={item.content}
      onPress={() => selectStoryHandler(item._id, item.title, item.content)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TitleIntethi>{category} Stories</TitleIntethi>
      </View>
      {loading ? (
        <View>
          <Text>Loading...</Text>
          <Image source={require("../assets/loading.gif")} />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <View style={styles.downloadButtonContainer}>
            <Button>Download All</Button>
          </View>

          <FlatList
            data={stories}
            renderItem={renderStoryItem}
            keyExtractor={(item) => item._id}
          />
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
    backgroundColor: GlobalStyles.colors.primary400,
    marginBottom: 10,
    marginTop: 10,
  },
  downloadButtonContainer: {
    margin: 10,
  },
  listContainer: {
    flex: 1,

    marginBottom: 20,
    borderBottomColor: GlobalStyles.colors.borderFade,
    borderBottomWidth: 4,
  },
});
