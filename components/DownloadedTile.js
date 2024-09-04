import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../constants/styles";

/**DownloadedTile is a component that shows a pressable tile and handles a touch event.
 * A tile acts as a button that will navigate to a the respective downloaded story screen
 *
 *@component
 *@param {Object} props - The DownloadedTile component props.
 *@param {string} props.title - The text that is seen on the tile (The category name)
 *@param {Function} props.onPress - The function that is executed/called on tile press (Generally to navigate to corresponding category screen)
 *
 *@example
 * <CategoryTile title={"Text for tile"} onPress={()=> Console.log("Downloaded story tile was pressed")}>
 *
 *@returns {JSX.Element} The pressable tile component
 *
 */
function DownloadedTile({ title, onPress }) {
  return (
    <View style={styles.box}>
      <TouchableOpacity style={styles.tile} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DownloadedTile;

const styles = StyleSheet.create({
  box: {
    backgroundColor: GlobalStyles.colors.errText,
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  tileBox: {
    flex: 1,
  },
  viewDownloadBox: {
    flex: 1,
  },
  tile: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewDownloadText: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
