import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";
import { GlobalStyles } from "../constants/styles";

const { width } = Dimensions.get("window");

function TitleIntethi({ children }) {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}

export default TitleIntethi;

const styles = StyleSheet.create({
  title: {
    color: GlobalStyles.colors.primary700,
    fontSize: width * 0.08, // Responsive font size (adjusts to device)
    textAlign: "center",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
