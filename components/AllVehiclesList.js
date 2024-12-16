import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getAllVehicles from "../api/vehicles";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

const VehicleCard = ({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={styles.model}>{item.model}</Text>
    <View style={styles.details}>
      <Text style={styles.seats}>{item.brand}</Text>
      <Text style={styles.price}>KD{item.price.toLocaleString()}</Text>
    </View>
    <Text style={styles.included}>Incl. 500 free kilometers</Text>
  </View>
);

const AllVehiclesList = () => {
  const {
    data: vehiclesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  useEffect(() => {
    if (vehiclesResponse && vehiclesResponse.vehicles) {
      setFilteredVehicles(vehiclesResponse.vehicles);
    }
  }, [vehiclesResponse]);

  useEffect(() => {
    filterVehicles();
  }, [searchQuery, selectedBrand, minPrice, maxPrice]);

  const filterVehicles = () => {
    if (!vehiclesResponse || !vehiclesResponse.vehicles) return;

    let filtered = vehiclesResponse.vehicles;

    if (searchQuery) {
      filtered = filtered.filter((vehicle) =>
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter((vehicle) => vehicle.brand === selectedBrand);
    }

    if (minPrice) {
      filtered = filtered.filter(
        (vehicle) => vehicle.price >= parseInt(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (vehicle) => vehicle.price <= parseInt(maxPrice)
      );
    }

    setFilteredVehicles(filtered);
  };

  // Extract unique brands from the list of vehicles
  const brands =
    vehiclesResponse && vehiclesResponse.vehicles
      ? [...new Set(vehiclesResponse.vehicles.map((vehicle) => vehicle.brand))]
      : [];

  if (isLoading) return <Text style={styles.message}>Loading...</Text>;
  if (error || (vehiclesResponse && vehiclesResponse.error))
    return <Text style={styles.message}>Error loading vehicles</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Offers</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedBrand}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedBrand(itemValue)}
        >
          <Picker.Item label="All Brands" value="" />
          {brands.map((brand, index) => (
            <Picker.Item key={index} label={brand} value={brand} />
          ))}
        </Picker>

        <TextInput
          style={styles.priceInput}
          placeholder="Min Price"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={setMinPrice}
        />

        <TextInput
          style={styles.priceInput}
          placeholder="Max Price"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
        />
      </View>

      <FlatList
        data={filteredVehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <VehicleCard item={item} />}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  header: {
    backgroundColor: "#1a1a1a",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    width: "100%",
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
    width: "100%",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  picker: {
    flex: 2,
    resizeMode: "contain",
    width: "100%",
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginLeft: 10,
    resizeMode: "contain",
    width: "100%",
  },
  card: {
    backgroundColor: "#E6F7FF",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    resizeMode: "contain",
  },
  model: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  seats: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  included: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
  message: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});

export default AllVehiclesList;
