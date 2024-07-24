import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Button({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: GlobalStyles.colors.primary800 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 30,
    margin: 4,
    overflow: "hidden",
    elevation: 5,
  },
  buttonInnerContainer: {
    borderRadius: 30,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.7,
  },
  buttonText: {
    fontSize: 24,
    color: GlobalStyles.colors.primary200,
    textAlign: "center",
  },

  pressed: {
    opacity: 0.8,
  },
});
