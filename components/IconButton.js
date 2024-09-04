import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * IconButton is a component that is used to create a button that is seen an icon.
 * It acts as a normal button in that it will call a function when it is pressed.
 * The button can be customized using the 'icon', 'size', and 'color' props so it can be used for different actions.
 *
 * @component
 * @param {Object} props - IconButton component props
 * @param {string} props.icon - The string name of the icon used for the button.
 * @param {number} props.size - The size of the icon displayed
 * @param {string} props.color - The color of the icon
 * @param {Function} props.onPress - The function that is executed/called on button press
 *
 * @example
 * <IconButton icon= "filter-sharp" size={36} color="#5e0e0e" onPress={()=> Console.log("Icon button pressed.")}/>
 *
 * @returns {JSX.Element} The pressable icon button component
 */
function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} onPress={onPress} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 2,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  pressed: {
    opacity: 0.75,
  },
});
