import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ConnectionCheck({ mongoURL }) {
  const [isConnectedToServer, setIsConnectedToServer] = useState(false);

  useEffect(() => {
    async function checkConnection() {
      try {
        //console.log({ mongoURL });
        const response = await fetch(`${mongoURL}/healthcheck`);

        if (response.ok) {
          setIsConnectedToServer(true);
        } else {
          setIsConnectedToServer(false);
        }
      } catch (error) {
        //console.log("Here");
        setIsConnectedToServer(false);
      }
    }

    checkConnection();

    const checkInterval = setInterval(checkConnection, 3000);

    return () => clearInterval(checkInterval);
  }, [mongoURL]);

  //console.log(isConnectedToServer);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isConnectedToServer
          ? "Connected to Server  "
          : "Not Connected to Server  "}
      </Text>
      <Ionicons
        name={isConnectedToServer ? "cloud" : "cloud-offline"}
        size={36}
        color={
          isConnectedToServer
            ? GlobalStyles.colors.primary400
            : GlobalStyles.colors.error500
        }
      />
    </View>
  );
}

export default ConnectionCheck;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
