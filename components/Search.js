import { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { GlobalStyles } from "../constants/styles";
import IconButton from "./IconButton";
import Button from "./Button";

/**
 * The Search component is used to search for stories available on the application.
 * It will return a list of stories that match the inputted search string.
 * THis component allow users to serach and select a single story by pressing on it in the returned list of stories
 *
 * @component
 * @param {Object} props - Search component props
 * @param {Object} props.navigation - This is an object provided by React Navigation, used for transitioning to screens
 *
 * @example
 * <Search navigation = {navigation}/>
 *
 *
 * @returns {JSX.Element} The search component
 */

function Search({ navigation }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);

  /**
   * fetchSearchResults fetches stories based on the title.
   * If the title matches the search input the story will be returned in the list and will be displayed as a lsit of pressable buttons.
   */

  async function fetchSearchResults() {
    try {
      if (search.length > 0) {
        setFetching(true);
        const response = await fetch(
          `https://inethistories-1.cs.uct.ac.za/stories?search=${search}`
        );
        const data = await response.json();

        //console.log("Filtered stories:", data);
        setResults(data);
        setFetching(false);
      } else {
        setResults("");
        setFetching(false);
      }
    } catch (error) {
      setFetching(false);
      //console.error("Error fetching search results:", error);
    }
  }

  /**
   * Responsible for handling the input text for the search. It updates the search state
   * @param {string} search - String used to search for stories, entered by the users
   *
   */

  const onChangeText = (search) => setSearch(search);

  /**
   * Calls the function for the searching of stories when the search icon is pressed
   */
  function onIconPress() {
    //console.log("search term:", search);
    fetchSearchResults();
  }

  /**
   * When the search feature is closed, the results are cleared and the search input is cleared
   */

  function onClosePress() {
    setSearch("");
    setResults([]);
  }

  /**
   * when the search action is canceled, the onClosePress fucntion is called and the keyboard is closed
   */
  function onCancelPress() {
    Keyboard.dismiss();
    onClosePress();
  }

  /**
   * Creates pressable tiles from the search results that will be visible to the user.
   *
   * @param {Object} item - Object that holds data for a single story.
   *
   * @returns {JSX.Element} - A touchable component with text of a story title
   */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Story", {
          id: item._id,
          title: item.title,
          content: item.content,
          likes: item.likes,
        })
      }
    >
      <Text style={styles.resultItem}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for stories..."
        onChangeText={onChangeText}
        value={search}
        elevation={2}
        keyboardAppearance="dark"
        onClearIconPress={onClosePress}
        iconColor={GlobalStyles.colors.primary500}
        onSubmitEditing={onIconPress}
        onIconPress={onIconPress}
        style={{
          backgroundColor: GlobalStyles.colors.white,
          borderColor: GlobalStyles.colors.primary200,
          borderWidth: 2,
        }}
      />
      {results.length > 0 && search.length > 0 && (
        <IconButton
          icon="chevron-up-sharp"
          size={30}
          color={GlobalStyles.colors.primary500}
          onPress={onClosePress}
        />
      )}
      {search.length > 0 && (
        <View style={styles.searchResultList}>
          {fetching ? (
            <View style={styles.searchingIndicatorBox}>
              <Image
                style={styles.searchingIndicator}
                source={require("../assets/searching (1).gif")}
              />
            </View>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderItem}
            />
          )}

          <Button onPress={onCancelPress}>Cancel</Button>
        </View>
      )}
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  resultItem: {
    padding: 10,
    margin: 1,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.primary700,
    overflow: "hidden",
  },
  searchResultList: {
    paddingBottom: 200,
  },
  searchingIndicatorBox: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    overflow: "hidden",
  },
  searchingIndicator: {
    width: "100%",
  },
});
