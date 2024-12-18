import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useMemo } from "react";
import { getAllVehicles } from "../api/vehicles";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  primary: "#1b2128", // Airbnb-style red
  secondary: "#1b2128", // Dark gray for text
  accent: "#1b2128", // Matching primary for active elements
  lightGray: "#dddddd", // Light gray for inactive elements
};

const PopularCars = ({ carosel }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const {
    data: vehicles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter vehicles to get one car per brand
  const uniqueBrandVehicles = useMemo(() => {
    if (!vehicles?.vehicles) return [];
    const brandMap = new Map();

    vehicles.vehicles.forEach((vehicle) => {
      if (!brandMap.has(vehicle.brand)) {
        brandMap.set(vehicle.brand, vehicle);
      }
    });

    return Array.from(brandMap.values());
  }, [vehicles]);

  if (isLoading) {
    return (
      <View style={styles.outerContainer}>
        <Text>Loading vehicles...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.outerContainer}>
        <Text>Error loading vehicles: {error.message}</Text>
      </View>
    );
  }

  const handleScroll = (event) => {
    if (carosel) {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / width);
      setCurrentIndex(index);
    }
  };

  const renderCars = ({ item }) => (
    <TouchableOpacity
      style={
        carosel
          ? [
              styles.container,
              {
                width: width - 40,
                marginHorizontal: 20,
              },
            ]
          : styles.container
      }
      onPress={() => navigation.navigate("Vehicle Details", { vehicle: item })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.carName}>
          {item.brand} {item.model}
        </Text>
        <Text style={styles.carYear}>{item.year}</Text>
        <Text style={styles.carPrice}>
          <Text style={styles.currencyText}>KD </Text>
          {item.price.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderDotIndicator = () => {
    return (
      <View style={styles.paginationDots}>
        {uniqueBrandVehicles.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.headerText}>Popular Cars</Text>
      <FlatList
        data={uniqueBrandVehicles}
        renderItem={renderCars}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={carosel ? null : { paddingHorizontal: 20 }}
        pagingEnabled={carosel}
        snapToAlignment="center"
        snapToInterval={carosel ? width : undefined}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      {carosel && (
        <View style={styles.paginationContainer}>{renderDotIndicator()}</View>
      )}
    </View>
  );
};

export default PopularCars;

const styles = StyleSheet.create({
  outerContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: "Bold",
    marginBottom: 20,
    color: "#1a1a1a",
    letterSpacing: 0.5,
    fontFamily: "",
  },
  container: {
    width: 280,
    height: 320,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginRight: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    height: "65%",
    width: "100%",
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    objectFit: "contain",
  },
  infoContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  carName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  carYear: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
    fontWeight: "500",
  },
  carPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.secondary,
  },
  currencyText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  paginationContainer: {
    marginTop: 15,
    marginBottom: 5,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  dot: {
    width: 20,
    height: 3,
    marginHorizontal: 3,
    borderRadius: 1,
    transition: "0.3s ease",
  },
  activeDot: {
    backgroundColor: COLORS.accent,
    width: 30,
  },
  inactiveDot: {
    backgroundColor: COLORS.lightGray,
  },
});
