import { StyleSheet, Text, View, Image } from "react-native";
import { GlobalStyles } from "../constants/styles";
import TitleIntethi from "../components/TitleInethi";

function AboutScreen() {
  return (
    <View style={styles.container}>
      <TitleIntethi>iNethi Stories</TitleIntethi>
      <Image source={require("../assets/aboutus.png")} style={styles.logo} />
      <TitleIntethi>About Us</TitleIntethi>
      <Text style={styles.description}>TEXT HERE</Text>
      <Text style={styles.description}>MORE TEXT HERE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
});

export default AboutScreen;
