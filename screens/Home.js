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
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import CarBrandsList from "../componant/CarBrandsList";
import PopularCars from "../componant/PopularCars";
import AIRecomendation from "../components/AIRecomendation";
import AnimatedHeader from "../components/AnimatedHeader";
import UserContext from "../context/UserContext";
import { deleteToken } from "../api/storage";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showButtonTooltip, setShowButtonTooltip] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const tooltipOpacity = useRef(new Animated.Value(0)).current;
  const tooltipScale = useRef(new Animated.Value(0.95)).current;
  const buttonTooltipOpacity = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    // Hide button tooltip after 5 seconds
    const timeout = setTimeout(() => {
      Animated.timing(buttonTooltipOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowButtonTooltip(false));
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (modalVisible) {
      // Animate in
      Animated.parallel([
        Animated.timing(tooltipOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(tooltipScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();

      // Animate out after 5 seconds
      const timeout = setTimeout(() => {
        Animated.parallel([
          Animated.timing(tooltipOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(tooltipScale, {
            toValue: 0.95,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
          }),
        ]).start();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

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

        {/* All Vehicles Section */}

        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.allVehiclesCard}
            onPress={() => navigation.navigate("All Vehicles")}
          >
            <View style={styles.allVehiclesContent}>
              <Text style={styles.allVehiclesTitle}>Explore All Vehicles</Text>
              <Text style={styles.allVehiclesSubtitle}>
                Discover our complete collection
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View>
          <PopularCars carosel={true} />
        </View>

        <View style={{ height: 100 }} />
      </AnimatedHeader>

      <TouchableOpacity
        style={styles.floatingAiButton}
        onPress={() => setModalVisible(true)}
      >
        {showButtonTooltip && (
          <Animated.View
            style={[
              styles.floatingButtonTooltip,
              { opacity: buttonTooltipOpacity },
            ]}
          >
            <Text style={styles.floatingButtonTooltipText}>Ask Yassirly!</Text>
            <View style={styles.tooltipArrow} />
          </Animated.View>
        )}
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

            <Animated.View
              style={[
                styles.tooltip,
                {
                  opacity: tooltipOpacity,
                  transform: [{ scale: tooltipScale }],
                },
              ]}
            >
              <View style={styles.tooltipContent}>
                <View style={styles.iconContainer}>
                  <Icon name="robot-excited" size={60} color="#FFFFFF" />
                </View>
                <Text style={styles.tooltipTitle}>
                  Welcome to AI Assistant!
                </Text>
                <Text style={styles.tooltipDescription}>
                  I'm here to help you find your perfect car. Here's how to use
                  me:
                </Text>
                <View style={styles.instructionContainer}>
                  <View style={styles.instructionItem}>
                    <Icon name="chat" size={24} color="#1B2128" />
                    <Text style={styles.instructionText}>
                      Tell me your preferences (budget, style, features)
                    </Text>
                  </View>
                  <View style={styles.instructionItem}>
                    <Icon name="car-search" size={24} color="#1B2128" />
                    <Text style={styles.instructionText}>
                      I'll analyze our inventory to find matches
                    </Text>
                  </View>
                  <View style={styles.instructionItem}>
                    <Icon name="thumb-up" size={24} color="#1B2128" />
                    <Text style={styles.instructionText}>
                      Get personalized recommendations instantly
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>

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
  floatingButtonTooltip: {
    position: "absolute",
    bottom: 15,
    right: 75,
    backgroundColor: "#2A3441",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  floatingButtonTooltipText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  tooltipArrow: {
    position: "absolute",
    bottom: 12,
    right: -6,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderLeftWidth: 6,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#2A3441",
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
  allVehiclesCard: {
    backgroundColor: "#2A3441",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  allVehiclesContent: {
    flex: 1,
  },
  allVehiclesTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  allVehiclesSubtitle: {
    fontSize: 14,
    color: "#9EA3B0",
  },
  tooltip: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(27, 33, 40, 0.98)",
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    margin: 15,
  },
  tooltipContent: {
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#2A3441",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1B2128",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  tooltipTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  tooltipDescription: {
    fontSize: 16,
    color: "#9EA3B0",
    textAlign: "center",
    marginBottom: 30,
  },
  instructionContainer: {
    width: "100%",
    gap: 20,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B2128",
    padding: 15,
    borderRadius: 12,
    gap: 15,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: "#FFFFFF",
  },
});
