import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import getAllVehicles from "../api/vehicles";
import Icon from "react-native-vector-icons/Ionicons";

const VehicleCard = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={styles.model}>{item.model}</Text>
    <View style={styles.details}>
      <Text style={styles.seats}>🪑 {item.seats} Seats</Text>
      <Text style={styles.price}>€{item.price.toLocaleString()}</Text>
    </View>
    <Text style={styles.included}>Incl. 500 free kilometers</Text>
  </View>
);

const AllVehicles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  if (isLoading) return <Text style={styles.message}>Loading...</Text>;
  if (error) return <Text style={styles.message}>Error loading vehicles</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Offers</Text>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data?.vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <VehicleCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllVehicles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#00274D", // Dark blue background
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#E6F7FF", // Light blue background for cards
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  model: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  seats: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007BFF", // Blue text for price
  },
  included: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
});
