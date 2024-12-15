import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import getAllVehicles from "../api/vehicles";

const VehicleCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.model}>{item.model}</Text>
      <View style={styles.details}>
        <Text style={styles.year}>{item.year}</Text>
        <Text style={styles.price}>${item.price.toLocaleString()}</Text>
      </View>
    </View>
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
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginVertical: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    gap: 8,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  model: {
    fontSize: 16,
    color: "#666",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  year: {
    fontSize: 14,
    color: "#888",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2196F3",
  },
  message: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
