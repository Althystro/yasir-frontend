import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getAllVehicles from "../api/vehicles";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import AnimatedHeader from "./AnimatedHeader";
import DropDownPicker from "react-native-dropdown-picker";

import carBrands from "../data/carBrands";

import SimpleAnimatedHeader from "./SimpleAnimatedHeader";

const VehicleCard = ({ item }) => {
  const navigation = useNavigation();

  const brand = carBrands.find(
    (brand) => item.brand.toLowerCase() === brand.brand.toLowerCase()
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Vehicle Details", { vehicle: item })}
    >
      <View style={styles.blueCard}>
        <View style={styles.topRow}>
          <Text style={styles.carName}>{item.model}</Text>

          <Image
            source={{ uri: brand.logo }}
            style={styles.brandLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.detailRow}>
          <Icon
            name="pricetag-outline"
            size={20}
            color="gray"
            style={styles.icon}
          />
          <Text style={styles.price}>{item.price.toLocaleString()} KD</Text>
        </View>
      </View>
      <Image
        source={{ uri: item.image }}
        style={styles.carImage}
        resizeMode="contain"
      />
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

  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false); // Dropdown state
  const [brandItems, setBrandItems] = useState([]); // Dropdown items

  useEffect(() => {
    if (vehiclesResponse && vehiclesResponse.vehicles) {
      setFilteredVehicles(vehiclesResponse.vehicles);

      // Extract unique brands for the dropdown picker
      const uniqueBrands = [
        ...new Set(vehiclesResponse.vehicles.map((vehicle) => vehicle.brand)),
      ].map((brand) => ({ label: brand, value: brand }));
      setBrandItems([{ label: "All Brands", value: "" }, ...uniqueBrands]);
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
      <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search vehicles..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <DropDownPicker
          open={brandDropdownOpen}
          value={selectedBrand}
          items={brandItems}
          setOpen={setBrandDropdownOpen}
          setValue={setSelectedBrand}
          setItems={setBrandItems}
          placeholder="All Brands"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={2000}
        />

        <View style={styles.priceInputContainer}>
          <View style={styles.priceInputWrapper}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min Price"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <Text style={styles.currencyLabel}>KD</Text>
          </View>

          <View style={styles.priceInputWrapper}>
            <TextInput
              style={styles.priceInput}
              placeholder="Max Price"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
            <Text style={styles.currencyLabel}>KD</Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (isLoading) return <Text style={styles.message}>Loading...</Text>;
  if (error || (vehiclesResponse && vehiclesResponse.error))
    return <Text style={styles.message}>Error loading vehicles</Text>;

  return (
    <View style={styles.container}>
      <SimpleAnimatedHeader
        scrollY={scrollY}
        title="Gallery"
        backgroundColor="#1B2128"
      >
        <View style={styles.contentContainer}>
          <View style={styles.mainView}>
            <View style={styles.searchContainer}>
              <Icon
                name="search-outline"
                size={20}
                color="#666"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search vehicles..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.filterContainer}>
              <DropDownPicker
                open={brandDropdownOpen}
                value={selectedBrand}
                items={brandItems}
                setOpen={setBrandDropdownOpen}
                setValue={setSelectedBrand}
                setItems={setBrandItems}
                placeholder="All Brands"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                zIndex={2000}
              />

              <View style={styles.priceInputContainer}>
                <View style={styles.priceInputWrapper}>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Min Price"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={minPrice}
                    onChangeText={setMinPrice}
                  />
                  <Text style={styles.currencyLabel}>KD</Text>
                </View>

                <View style={styles.priceInputWrapper}>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Max Price"
                    placeholderTextColor="#666"
                    keyboardType="numeric"
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                  />
                  <Text style={styles.currencyLabel}>KD</Text>
                </View>
              </View>
            </View>
          </View>

          <FlatList
            data={filteredVehicles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <VehicleCard item={item} />}
            contentContainerStyle={styles.listContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          />
        </View>
      </SimpleAnimatedHeader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    zIndex: 1,
  },
  mainView: {
    padding: 20,
    backgroundColor: "#fff",
    gap: 15,
    zIndex: 2000,
    elevation: 2000,
  },
  filterContainer: {
    gap: 10,
    width: "100%",
    zIndex: 2000,
    elevation: 2000,
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderColor: "#ddd",
    zIndex: 2000,
    elevation: 2000,
  },
  dropdownContainer: {
    backgroundColor: "#ffffff",
    borderColor: "#ddd",
    zIndex: 2000,
    elevation: 2000,
  },
  listContent: {
    backgroundColor: "#fff",
    zIndex: 1,
  },
  header: {
    backgroundColor: "#1B2128",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    backgroundColor: "#f8f8f8",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  priceInputContainer: {
    flexDirection: "row",
    gap: 10,
  },
  priceInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 15,
    height: 45,
  },
  priceInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  currencyLabel: {
    color: "#666",
    fontSize: 16,
    marginLeft: 5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    elevation: 3,
    position: "relative",
  },
  blueCard: {
    backgroundColor: "#1B2128",
    borderRadius: 15,
    padding: 15,
    width: 180,
    height: 160,
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    marginRight: -55,
    zIndex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  carName: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  brandLogo: {
    width: 50,
    height: 30,
    marginRight: 15,
  },
  price: {
    fontSize: 16,
    color: "#708090",
    fontWeight: "bold",
    marginRight: 50,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  carImage: {
    width: 250,
    height: 200,
    borderRadius: 15,
    position: "relative",
    zIndex: 2,
  },
  included: {
    marginTop: 5,
    color: "gray",
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
  },
  icon: {
    marginBottom: 30,
  },
});

export default AllVehiclesList;
