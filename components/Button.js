import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

/**Button is a custom component that is used to show a pressable button that is customized to fit the look of the application.
 * It handles user interactions, through touch events. When it is pressed, on iOS it changes opacity and on Android it has a ripple effect.
 *
 *@component
 *@param {React.ReactNode} props.children - What will be seen on the button (Text, icons)
 *@param {Function} props.onPress - The function that is executed/called on button press
 *
 *@example
 * <Button onPress = {() => Console.log("Button was pressed.")}>Text for button here</Button>
 *
 *@returns {JSX.Element} The button component
 *
 */
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
    borderWidth: 3,
    borderColor: GlobalStyles.colors.primary700,
    backgroundColor: GlobalStyles.colors.primary50,
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
    color: GlobalStyles.colors.primary800,
    textAlign: "center",
  },

  pressed: {
    opacity: 0.8,
  },
});
