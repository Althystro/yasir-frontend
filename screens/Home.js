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
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useRef } from "react";
import CarBrandsList from "../componant/CarBrandsList";
import PopularCars from "../componant/PopularCars";
import AIRecomendation from "../components/AIRecomendation";

const HEADER_MAX_HEIGHT = 180;
const HEADER_MIN_HEIGHT = 85;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.75],
    extrapolate: "clamp",
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -15],
    extrapolate: "clamp",
  });

  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 20],
    extrapolate: "clamp",
  });

  const headerSubtitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.midSection, { height: headerHeight }]}>
        <Animated.View
          style={[
            styles.headerContent,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslateY },
                { translateX: titleTranslateX },
              ],
            },
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.midText}>Yessir</Text>
            <Text style={styles.arabicText}>يسر</Text>
          </View>
          <Animated.Text
            style={[styles.subText, { opacity: headerSubtitleOpacity }]}
          >
            Your Premium Car Experience
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.bottomSection}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
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
          <CarBrandsList />
        </View>
        {/* Popular Car card */}
        <View>
          <PopularCars />
        </View>
        <View>
          <PopularCars />
        </View>

        {/* Add extra padding at bottom for scrolling */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>

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
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#1B2128",
    width: "100%",
    marginTop: -10,
  },
  midSection: {
    backgroundColor: "#1B2128",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  headerContent: {
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  midText: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  arabicText: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
    fontFamily: "System",
  },
  subText: {
    color: "#9EA3AE",
    fontSize: 16,
    marginTop: 8,
    letterSpacing: 0.3,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 20,
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
