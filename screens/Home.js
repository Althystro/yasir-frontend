import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  searchInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import CarBrandsList from "../componant/CarBrandsList";
import PopularCars from "../componant/PopularCars";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={styles.topSection}>
        {/* The search button and profile ? */}

        <View></View>
      </View>
      <View style={styles.midSection}>
        {/* Only for the logo moto */}
        <Text style={styles.midText}> Yessir | يسر </Text>
        <Text style={{ color: "white" }}>Vroom</Text>
      </View>

      {/* Containes all cards */}
      <ScrollView style={styles.bottomSection}>
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
        {/* Brands categories List */}
        <View style={styles.sectionContainer}>
          <CarBrandsList />
        </View>
        {/* Popular Car card */}
        <View>
          <PopularCars />
        </View>

        {/* The Ai / calculater card this is will be changed later */}
        <View style={{ flexDirection: "row" }}>
          {/* Ai card */}
          <TouchableOpacity
            style={styles.aiSection}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="robot" size={40} color="#fff" />
            <Text style={styles.aiText}>AI Assistant</Text>
            <Text style={styles.aiSubText}>Get smart suggestions</Text>
          </TouchableOpacity>

          {/* AI Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>AI Suggestions</Text>
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Icon name="close" size={24} color="#1B2128" />
                  </Pressable>
                </View>

                <ScrollView style={styles.suggestionsList}>
                  <View style={styles.suggestionItem}>
                    <Icon name="car-info" size={24} color="#1B2128" />
                    <Text style={styles.suggestionText}>
                      Compare car prices across different dealerships
                    </Text>
                  </View>

                  <View style={styles.suggestionItem}>
                    <Icon name="calculator" size={24} color="#1B2128" />
                    <Text style={styles.suggestionText}>
                      Calculate monthly payments and financing options
                    </Text>
                  </View>

                  <View style={styles.suggestionItem}>
                    <Icon name="map-marker" size={24} color="#1B2128" />
                    <Text style={styles.suggestionText}>
                      Find nearest dealerships with your preferred car
                    </Text>
                  </View>

                  <View style={styles.suggestionItem}>
                    <Icon name="star" size={24} color="#1B2128" />
                    <Text style={styles.suggestionText}>
                      Get personalized car recommendations
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          {/* Calculater card */}
        </View>
      </ScrollView>
      {/* </ScrollView> */}
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
    flex: 0.3,
    backgroundColor: "#ffffff",
    // backgroundColor: "red",
  },
  midSection: {
    flex: 0.5,
    backgroundColor: "#1B2128",
    // backgroundColor: "blue",
    marginTop: -90,
    paddingTop: -30,

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
    marginTop: -140,
    marginBottom: 60,
    alignContent: "flex-start",
  },
  midText: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: -120,
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
  aiSection: {
    backgroundColor: "#1B2128",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    width: 250,
    height: 300,
  },
  aiText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
  },
  aiSubText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B2128",
  },
  closeButton: {
    padding: 5,
  },
  suggestionsList: {
    maxHeight: "90%",
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 10,
  },
  suggestionText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#1B2128",
    flex: 1,
  },
});
