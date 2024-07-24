import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import ConnectionCheck from "./components/ConnectionCheck";

export default function App() {
  // useFonts({
  //   titleIos: require("./assets/fonts/orangejuice.ttf"),
  //   titleAndroid: require("./assets/fonts/Margarine-Regular.ttf"),
  // });
  return (
    <View style={styles.container}>
      <View style={styles.connectionContainer}>
        <ConnectionCheck mongoURL="http://192.168.100.101:5000" />
      </View>
      <View style={styles.content}>
        <StatusBar style="auto" />
        <StackNavigator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  connectionContainer: {
    paddingTop: 30,
    flexDirection: "row-reverse",
    paddingRight: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
});
