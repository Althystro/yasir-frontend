import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import getAllVehicles from "../api/vehicles";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

const PopularCars = () => {
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

  const renderCars = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Vehicle Details", { vehicle: item })}
    >
      <Image
        source={{
          uri: "https://via.placeholder.com/150",
        }}
        style={styles.image}
      />
      <Text style={styles.carName}>
        {item.brand} {item.model}
      </Text>
      <Text style={styles.carYear}>{item.year}</Text>
      <Text style={styles.carPrice}>${item.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.headerText}>Popular Cars:</Text>
      <FlatList
        data={vehicles?.vehicles || []}
        renderItem={renderCars}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
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
});
