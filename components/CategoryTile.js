import { View, StyleSheet, Pressable, Platform, Text } from "react-native";
import { GlobalStyles } from "../constants/styles";

function CategoryTile({ title, onPress }) {
  return (
    <View style={styles.tileItem}>
      <Pressable
        android_ripple={{ color: "#cccccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.innerContainer,
            { backgroundColor: GlobalStyles.colors.primary100 },
            { borderRadius: 8 },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryTile;

const styles = StyleSheet.create({
  tileItem: {
    flex: 1,
    marginVertical: 20,
    width: "100%",
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    overflow: Platform.select({ android: "hidden", ios: "visible" }),
  },

  button: {
    flex: 1,
  },

  buttonPressed: {
    opacity: 0.5,
  },

  innerContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    color: GlobalStyles.colors.accent50,
  },

  title: {
    fontSize: 24,
  },
});
