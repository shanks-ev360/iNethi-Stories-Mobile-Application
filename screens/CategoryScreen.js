import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import CategoryTile from "../components/CategoryTile";
import { GlobalStyles } from "../constants/styles";
import TitleIntethi from "../components/TitleInethi";
import Button from "../components/Button";

function CategoryScreen({ navigation }) {
  const ip_address = "192.168.100.101";
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${ip_address}:5000/categories`);
        const data = await response.json();
        //console.log("Fetched data:", data); // Log the data
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <CategoryTile
      title={item.category}
      onPress={() =>
        navigation.navigate("Stories", { category: item.category })
      }
    />
  );

  function downloadAllHandler() {
    console.log("DOWNLOAD ALL");
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TitleIntethi>Categories</TitleIntethi>
      </View>
      {loading ? (
        <View>
          <Image source={require("../assets/loading.gif")} />
        </View>
      ) : (
        <View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
      {/* <View style={styles.buttonBottomContainer}>
        <Button onPress={homeButtonHandler}>
          <Ionicons name="home" />
        </Button>
      </View> */}
    </View>
  );
}

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    width: 300,
    justifyContent: "center",
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary400,
    marginBottom: 10,
    marginTop: 100,
  },
  buttonBottomContainer: {
    flexDirection: "row",
  },
});
