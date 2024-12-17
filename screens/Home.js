import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  searchInput,
  Modal,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useRef, useContext } from "react";
import CarBrandsList from "../componant/CarBrandsList";
import PopularCars from "../componant/PopularCars";
import AIRecomendation from "../components/AIRecomendation";
import AnimatedHeader from "../components/AnimatedHeader";
import { deleteToken } from "../api/storage";
import UserContext from "../context/UserContext";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    deleteToken();
    setUser(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader
        scrollY={scrollY}
        title="Yessir | يسر"
        subtitle="Vroom"
        backgroundColor="#1B2128"
        textColor="white"
      >
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
          />
        </View>
        {/* Brands categories List */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <CarBrandsList />
        </View>
        {/* Popular Car card */}
        <View>
          <PopularCars />
        </View>
        <View>
          <PopularCars />
        </View>

        <View style={{ height: 100 }} />
      </AnimatedHeader>

      <TouchableOpacity
        style={styles.floatingAiButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="robot" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
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
                <Icon name="close" size={24} color="#fff" />
              </Pressable>
            </View>
            <AIRecomendation setModalVisible={setModalVisible} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2128",
    width: "100%",
    marginTop: -40,
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
    backgroundColor: "#1B2128",
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#1B2128",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
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
