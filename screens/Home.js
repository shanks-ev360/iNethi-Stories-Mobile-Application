import { SafeAreaView, View, StyleSheet, Image } from "react-native";
import TitleIntethi from "../components/TitleInethi";
import Button from "../components/Button";
import { GlobalStyles } from "../constants/styles";

function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TitleIntethi>Welcome to iNethi Stories</TitleIntethi>
        </View>
        <View style={styles.image}>
          <Image source={require("../assets/iNethiBranchingTreeLogo.png")} />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate("Categories")}>
              Categories
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate("About")}>About</Button>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.navigate("Downloads")}>
            Downloaded Stories
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background, // Adjust according to your design
  },
  container: {
    flex: 1,
    padding: 5,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Adjusted for SafeAreaView
    paddingHorizontal: 10,
    borderRadius: 10,
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
});
