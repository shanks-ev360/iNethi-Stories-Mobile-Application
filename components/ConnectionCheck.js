import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { GlobalStyles } from "../constants/styles";

/**
 * ConnectionCheck is a component that is used to determine and display the connection status to the server.
 * Using icon and text to reveal if connected to the server.
 *
 * @component
 * @param {Object} props - ConnectionCheck component props
 * @param {string} props.addressString - URL of server
 *
 * @example
 * <ConnectionCheck addressString="https://serverexample.com" />
 *
 * @returns {JSX.Element} The connection check component
 */

function ConnectionCheck({ addressString }) {
  /**
   * checkConnection is function that determines if connected to the server. It is an asynchronous function.
   * The function fetches a response from the healthcheck endpoint.
   * The connection status is updated based on the response
   */
  const [isConnectedToServer, setIsConnectedToServer] = useState(false);

  useEffect(() => {
    async function checkConnection() {
      try {
        const response = await fetch(`${addressString}/healthcheck`);
        //console.log("Fetch response:", response);
        if (response.ok) {
          setIsConnectedToServer(true);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        setIsConnectedToServer(false);
      }
    }

    checkConnection();
    const checkInterval = setInterval(checkConnection, 3000);
    return () => clearInterval(checkInterval);
  }, [addressString]); // addressSting value change will trigger useEffect, if there is a change to conenction status it will refelct on the UI

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
