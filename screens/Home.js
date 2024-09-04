import { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Image, Keyboard } from "react-native";
import TitleIntethi from "../components/TitleInethi";
import Button from "../components/Button";
import { GlobalStyles } from "../constants/styles";
import Search from "../components/Search";
function Home({ navigation }) {
  const [keyboardShowing, setKeyboardShowing] = useState(false);

  useEffect(() => {
    const keyboardShow = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShowing(true);
    });
    const keyboardDontShow = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShowing(false);
    });

    return () => {
      keyboardShow.remove();
      keyboardDontShow.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Search navigation={navigation}></Search>
        <View style={styles.titleContainer}>
          {!keyboardShowing ? (
            <>
              <TitleIntethi size={40}> iNethi Stories </TitleIntethi>
            </>
          ) : (
            <></>
          )}
        </View>
        {!keyboardShowing ? (
          <>
            <View style={styles.image}>
              <Image
                source={require("../assets/iNethiBranchingTreeLogo.png")}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.imageWithKeyboard}>
              <Image
                source={require("../assets/iNethiBranchingTreeLogo.png")}
              />
            </View>
          </>
        )}

        {!keyboardShowing ? (
          <>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate("Categories")}>
                  Categories
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate("About")}>
                  About
                </Button>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={() => navigation.navigate("Downloads")}>
                Downloaded Stories
              </Button>
              {/* <Button onPress={clear}>Clear likes</Button> */}
            </View>
          </>
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background, // Adjust according to  design
  },
  container: {
    flex: 1,
    padding: 5,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageWithKeyboard: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
