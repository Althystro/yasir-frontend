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
import AIRecomendation from "../components/AIRecomendation";

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
      </ScrollView>

      {/* AI Assistant Floating Button */}
      <TouchableOpacity
        style={styles.floatingAiButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="robot" size={30} color="#fff" />
      </TouchableOpacity>

      {/* AI Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalView, { width: "100%", height: "100%" }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>AI Suggestions</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#1B2128" />
              </Pressable>
            </View>
            <AIRecomendation setModalVisible={setModalVisible} />
          </View>
        </View>
      </Modal>
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
    width: "100%",
  },
  // topSection: {
  //   flex: 0.3,
  //   backgroundColor: "#ffffff",
  // },
  // topSection: {
  //   // height: 120,
  //   backgroundColor: "#ffffff",
  //   paddingHorizontal: 20,
  //   paddingTop: 20,
  // },
  midSection: {
    height: 180,
    backgroundColor: "#1B2128",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 20,
  },
  midText: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  sectionContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    marginVertical: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  floatingAiButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#1B2128",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
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
