import { StyleSheet, Text, View, Dimensions } from "react-native";
import { GlobalStyles } from "../constants/styles";

const { width } = Dimensions.get("window");

/**
 * TitleInethi is a component that is used to show bold text with a shadow.
 * The size of the displayed text can be altered using the 'size' prop.
 *
 * @component
 * @param {Object} props - TitleInethi component props
 * @param {React.ReactNode} props.children - The text that is displayed as the title
 * @param {number} props.size - The size of the text for the title
 *
 * @example
 * <TitleInethi size={36}> Title Text Here </TitleInethi>
 *
 * @returns {JSX.Element} The TitleInethi component
 */

function TitleIntethi({ children, size }) {
  return (
    <View>
      <Text style={[styles.title, { fontSize: size }]}>{children}</Text>
    </View>
  );
}

export default TitleIntethi;

const styles = StyleSheet.create({
  title: {
    color: GlobalStyles.colors.primary200,
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: GlobalStyles.colors.primary800,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginHorizontal: 10,
  },
});
