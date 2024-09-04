import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ConnectionCheck from "./components/ConnectionCheck";

import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.connectionContainer}>
        <ConnectionCheck addressString="https://inethistories-1.cs.uct.ac.za"></ConnectionCheck>
      </View>
      <View style={styles.content}>
        <StatusBar style="auto" />
        <StackNavigator></StackNavigator>
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
  content: {
    flex: 1,
    justifyContent: "center",
  },
});
