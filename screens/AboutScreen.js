import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../constants/styles";
import TitleIntethi from "../components/TitleInethi";
import { Checkbox } from "react-native-paper";

function AboutScreen() {
  const [permissionStatus, setPermissionStatus] = useState(false);

  async function permissionStatusHandler(permissionStatus) {
    setPermissionStatus(!permissionStatus);
  }

  const isIOS = Platform.OS === "ios";
  return (
    <View style={styles.container}>
      <TitleIntethi size={40}> iNethi Stories </TitleIntethi>
      <Image source={require("../assets/aboutus.png")} style={styles.logo} />
      <TitleIntethi size={30}> About Us </TitleIntethi>
      <Text style={styles.description}>
        Welcome to our innovative branching narrative platform, where stories
        come to life through interactive experiences. Our platform allows users
        to engage with a diverse collection of branching stories, each offering
        unique paths and outcomes based on their choices.
      </Text>
      <Text style={styles.description}>
        {" "}
        Dive into a world where your decisions drive the story, creating a
        personalized adventure every time you read.
      </Text>
      <Text style={styles.description}>
        Please note we monitor which stories you view, like and download. If you
        would like to not have this information recorded please deselect the
        checkbox bellow
      </Text>
      {isIOS ? (
        <View style={styles.checkboxContainerForIOS}>
          <Checkbox
            status={permissionStatus ? "checked" : "unchecked"}
            color={GlobalStyles.colors.like50}
            onPress={() => {
              permissionStatusHandler(permissionStatus);
            }}
          />
        </View>
      ) : (
        <Checkbox
          status={permissionStatus ? "checked" : "unchecked"}
          onPress={() => {
            permissionStatusHandler(permissionStatus);
          }}
        />
      )}
      <Text style={styles.permissionStatus}>
        Monitoring status:{" "}
        {permissionStatus
          ? "Usage is being monitored"
          : "Usage is NOT being monitored"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  checkboxContainerForIOS: {
    borderWidth: 5,
    borderRadius: 100,
  },
  permissionStatus: {
    fontSize: 24,
    textAlign: "center",
  },
});

export default AboutScreen;
