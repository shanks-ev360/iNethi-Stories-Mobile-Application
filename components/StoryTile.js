import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";

/**
 * StoryTile is a component used to create and show stories to users.
 * Each tile is pressable component that displays the stroy title, number of likes, views, and downloads of a story.
 * A tile can be expanded incase icons for views, downloads, and likes are not clear to user.
 *
 * @component
 * @param {Object} props - StoryTile component props
 * @param {string} props.title - The title of the story for the tile
 * @param {number} props.views - The number of times the story has viewed
 * @param {number} props.downloads - The number of times the story has been downloaded
 * @param {number} props.likes - The number of likes for the story
 * @param {Function} props.onPress - The fucntion that is called when the tile is pressed (Navigate to the story screen)
 *
 * @example
 * <StoryTile title="Title of Story" views={20} downloads={4} likes={5} onPress={()=>console.log("Story was selected")}/>
 *
 * @returns {JSX.Element} The pressable StoryTile component
 */

function StoryTile({ title, views, downloads, likes, onPress }) {
  const [expandedLikeViewDownload, setExpandedLikeViewDownload] =
    useState(false);

  /**
   * Handles the expanding of the views, likes and downloads information.
   * Changes to state of the list (Expanded or not)
   */

  function handlePress() {
    setExpandedLikeViewDownload(!expandedLikeViewDownload);
  }
  return (
    <View style={styles.box}>
      <View style={styles.tileBox}>
        <TouchableOpacity style={styles.tile} onPress={onPress}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewDownloadBox}>
        <List.Section
          title=""
          style={{
            backgroundColor: GlobalStyles.colors.errText,
            borderRadius: 10,
          }}
        >
          <List.Accordion
            title=""
            left={(props) =>
              !expandedLikeViewDownload && (
                <View style={styles.likeViewDownloadIconBox}>
                  <View style={styles.metadataContainer}>
                    <Ionicons size={24} name="heart" />
                    <Text>{likes}</Text>
                  </View>
                  <View style={styles.metadataContainer}>
                    <Ionicons size={24} name="download" />
                    <Text>{downloads}</Text>
                  </View>
                  <View style={styles.metadataContainer}>
                    <Ionicons size={24} name="eye" />
                    <Text>{views}</Text>
                  </View>
                </View>
              )
            }
            expandedLikeViewDownload={expandedLikeViewDownload}
            onPress={handlePress}
            style={[
              styles.accordionStyle,
              !expandedLikeViewDownload && { paddingVertical: 0 },
            ]}
            titleStyle={[
              styles.accordionTitleText,
              !expandedLikeViewDownload && { paddingVertical: 1 },
            ]}
          >
            <List.Item
              title={`Likes: ${likes}`}
              left={(props) => (
                <Ionicons
                  {...props}
                  color={GlobalStyles.colors.like50}
                  name="heart"
                  size={28}
                />
              )}
            />
            <List.Item
              title={`Downloads: ${downloads}`}
              left={(props) => (
                <Ionicons {...props} name="download" size={28} />
              )}
            />
            <List.Item
              title={`Views: ${views}`}
              left={(props) => <Ionicons {...props} name="eye" size={28} />}
            />
          </List.Accordion>
        </List.Section>
      </View>
    </View>
  );
}

export default StoryTile;

const styles = StyleSheet.create({
  box: {
    backgroundColor: GlobalStyles.colors.errText,
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  accordionStyle: {
    backgroundColor: GlobalStyles.colors.errText,
  },
  accordionTitleText: {
    paddingVertical: 2,
  },
  tileBox: {
    flex: 1,
  },
  viewDownloadBox: {
    flex: 1,
  },
  tile: {
    padding: 15,
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewDownloadText: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
  likesText: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.like50,
  },
  tileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tileRowMiddle: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    paddingBottom: 2,
    paddingTop: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  likeViewDownloadIconBox: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  metadataContainer: {
    flexDirection: "row",
    paddingLeft: 50,
    alignItems: "center",
  },
});
