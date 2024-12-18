import React, { useContext } from "react";

import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TestDriveContext from "../context/TestDriveContext";
import Feather from "@expo/vector-icons/Feather";
import MapView, { Marker } from "react-native-maps";

const Confirmation = ({ vehicle }) => {
  const [TestDrive, setTestDrive] = useContext(TestDriveContext);
  const dealership = dealershipLocations[vehicle.brand];
  return (
    <View style={styles.container}>
      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <Feather name="check-circle" size={24} color="black" />
        <Text style={styles.iconContainerText}>
          Your booking has been confirmed!
        </Text>
      </View>

      {/* Details Container */}
      <View style={styles.detailsContainer}>
        {/* Date and Time */}
        <Text style={styles.detailLabel}>Date and Time:</Text>
        <Text style={styles.detailValue}>{TestDrive.date}</Text>
        <Text style={styles.detailValue}>{TestDrive.time}</Text>

        {/* Vehicle Details */}
        <Text style={styles.detailLabel}>Vehicle:</Text>
        <Text style={styles.detailValue}>
          {vehicle.brand} - {vehicle.model} - {vehicle.year}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <MaterialIcons name="location-on" size={24} color="black" />
        <Text style={styles.text}>{dealership.name}</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: dealership.latitude,
          longitude: dealership.longitude,
          latitudeDelta: 0.035,
          longitudeDelta: 0.035,
        }}
      >
        <Marker
          coordinate={{
            latitude: dealership.latitude,
            longitude: dealership.longitude,
          }}
          title={dealership.name}
          description={`Brand: ${vehicle.brand}`}
        />
      </MapView>
    </View>
  );
};
const dealershipLocations = {
  Toyota: {
    latitude: 29.313187,
    longitude: 47.931562,
    name: "Toyota AlSayer",
  },
  Ford: {
    latitude: 29.338687,
    longitude: 47.946438,
    name: "Ford AlGhanem",
  },
  "Mercedes-Benz": {
    latitude: 29.313437,
    longitude: 47.936062,
    name: "Mercedes-Benz AlMulla",
  },
  Chevrolet: {
    latitude: 29.313437,
    longitude: 47.934562,
    name: "Chevrolet AlGhanim",
  },
  Porsche: {
    latitude: 29.331688,
    longitude: 47.939062,
    name: "Porsche Behbehani",
  },
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  map: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  iconContainerText: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
  },
  detailsContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2, // For a subtle shadow
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    textAlign: "flex-start",
    alignSelf: "flex-start",
    padding: 10,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
});
