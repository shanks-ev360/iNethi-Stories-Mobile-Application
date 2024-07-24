import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../constants/styles";

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
