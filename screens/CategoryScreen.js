import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import CategoryTile from "../components/CategoryTile";
import { GlobalStyles } from "../constants/styles";
import TitleIntethi from "../components/TitleInethi";

function CategoryScreen({ navigation }) {
  const ip_address = "inethistories-1.cs.uct.ac.za";

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${ip_address}/categories`);
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

  //Create the category tile (categories are fetched from the database).
  //The tiles are 'buttons' to load stories in that category
  const createCategoryTile = ({ item }) => (
    <CategoryTile
      title={item.category}
      onPress={() =>
        navigation.navigate("Stories", { category: item.category })
      }
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TitleIntethi size={30}> Categories </TitleIntethi>
      </View>
      {loading ? (
        <View>
          <Image source={require("../assets/loading.gif")} />
        </View>
      ) : (
        <View>
          <FlatList
            data={categories}
            renderItem={createCategoryTile}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
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
    padding: 2,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    borderColor: GlobalStyles.colors.primary400,
    borderWidth: 4,
    marginBottom: 10,
    marginTop: 100,
  },
  buttonBottomContainer: {
    flexDirection: "row",
  },
});
