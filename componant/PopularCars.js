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
                width: width - 20,
                marginHorizontal: 10,
              },
            ]
          : styles.container
      }
      onPress={() => navigation.navigate("Vehicle Details", { vehicle: item })}
    >
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.image}
      />
      <Text style={styles.carName}>
        {item.brand} {item.model}
      </Text>
      <Text style={styles.carYear}>{item.year}</Text>
      <Text style={styles.carPrice}>KD {item.price.toLocaleString()}</Text>
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
              { backgroundColor: currentIndex === index ? "#000" : "#ccc" },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.headerText}>Popular Cars:</Text>
      <FlatList
        data={uniqueBrandVehicles}
        renderItem={renderCars}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={carosel ? null : { paddingHorizontal: 10 }}
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
      {carosel && renderDotIndicator()}
    </View>
  );
};

export default PopularCars;

const styles = StyleSheet.create({
  outerContainer: {
    paddingTop: 20,
  },
  headerText: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f7f0f0",
    marginRight: 10,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: "60%",
    borderRadius: 8,
    objectFit: "contain",
  },
  carName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  carYear: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  carPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#28a745",
    marginTop: 5,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
