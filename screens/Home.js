import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  searchInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import CarBrandsList from "../componant/CarBrandsList";
import PopularCars from "../componant/PopularCars";

const Home = () => {
  // Edit the restaurant data to whats used  here

  //     const [searchInput, setSearchInput] = useState("");
  //   const [filteredVehicles, setFilteredVehicles] = useState(restaurants);

  //   const handleSearch = (text) => {
  //     setSearchInput(text);
  //     const filtered = restaurants.filter((restaurant) =>
  //       restaurant.name.toLowerCase().includes(text.toLowerCase())
  //     );
  //     setFilteredVehicles(filtered);
  //   };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        {/* The search button and profile ? */}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon
            name="magnify"
            size={24}
            color="#1B2128"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={searchInput}
            // onChangeText={handleSearch}
          />
        </View>

        <View></View>
      </View>
      <View style={styles.midSection}>
        {/* Only for the logo moto */}
        <Text style={styles.midText}> Yessir | يسر </Text>
        <Text style={{ color: "white" }}>Vroom</Text>
      </View>

      {/* Containes all cards */}
      <View style={styles.bottomSection}>
        {/* Brands categories List */}
        <View style={styles.sectionContainer}>
          <CarBrandsList />
        </View>
        {/* Popular Car card */}
        <View>
            <PopularCars/>

        </View>

        {/* The Ai / calculater card this is will be changed later */}
        <View style={{flexDirection:'row'}}>
            {/* Ai card */}
            <View style={styles.aiSection}>

            </View>
            {/* Calculater card */}
            <View style={styles.calculaterSection}>

            </View>


        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  topSection: {
    flex: 0.6,
    backgroundColor: "#ffffff",
    // backgroundColor: "red",
  },
  midSection: {
    flex: 1,
    backgroundColor: "#1B2128",
    // backgroundColor: "blue",
    marginTop: -40,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flex: 3.5,
    backgroundColor: "#ffffff",
    // backgroundColor: "yellow",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -30,
    // justifyContent: "center",
    // alignItems: "center",
    alignContent: "flex-start",
  },
  midText: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  sectionContainer: {
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
    marginHorizontal: 40,
    borderRadius: 12,
    marginVertical: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  aiSection:{
    backgroundColor: '#1B2128',
    alignItems: "center",
    marginTop:20,
    marginRight: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    width: 250,
    height: 300,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 3},
    // shadowOpacity: 0.1,
    // shadowRadius: 8,

  },
  calculaterSection:{
    backgroundColor: '#EEEAE5',
    alignItems: "center",
    marginTop:20,
    marginRight: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    width: 250,
    height: 300,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 3},
    // shadowOpacity: 0.1,
    // shadowRadius: 8,

  }
});
