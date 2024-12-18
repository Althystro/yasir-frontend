import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getAllVehicles from "../api/vehicles";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AnimatedHeader from "./AnimatedHeader";

const VehicleCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Vehicle Details", { vehicle: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.model}>{item.model}</Text>
      <View style={styles.details}>
        <Text style={styles.seats}>{item.brand}</Text>
        <Text style={styles.price}>KD {item.price.toLocaleString()}</Text>
      </View>
      <Text style={styles.included}>Incl. 500 free kilometers</Text>
    </TouchableOpacity>
  );
};

const AllVehiclesList = () => {
  const {
    data: vehiclesResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  const scrollY = new Animated.Value(0);
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

  const ListHeaderComponent = () => (
    <View style={styles.mainView}>
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
    </View>
  );

  if (isLoading) return <Text style={styles.message}>Loading...</Text>;
  if (error || (vehiclesResponse && vehiclesResponse.error))
    return <Text style={styles.message}>Error loading vehicles</Text>;

  return (
    <View style={styles.container}>
      <AnimatedHeader
        scrollY={scrollY}
        title="Offers"
        backgroundColor="#1a1a1a"
      >
        <FlatList
          data={filteredVehicles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <VehicleCard item={item} />}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={styles.listContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </AnimatedHeader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    backgroundColor: "#fff",
  },
  listContent: {
    backgroundColor: "#fff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: -20,
    width: "100%",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -20,
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
    backgroundColor: "rgba(211, 211, 211, 0.4)",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    shadowColor: "rgba(211, 211, 211, 0.6)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
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
