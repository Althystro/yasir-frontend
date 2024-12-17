import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Confirmation = ({ dateTime, vehicle, dealership }) => {
  return (
    <View style={styles.container}>
      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <MaterialIcons name="check" size={32} color="white" />
      </View>

      {/* Details Container */}
      <View style={styles.detailsContainer}>
        {/* Date and Time */}
        <Text style={styles.detailLabel}>Date and Time:</Text>
        <Text style={styles.detailValue}>{dateTime}</Text>

        {/* Vehicle Details */}
        <Text style={styles.detailLabel}>Vehicle:</Text>
        <Text style={styles.detailValue}>
          {vehicle.model} - {vehicle.type} - {vehicle.year}
        </Text>

        {/* Dealership */}
        <Text style={styles.detailLabel}>Dealership:</Text>
        <Text style={styles.detailValue}>{dealership}</Text>
      </View>
    </View>
  );
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
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
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
});
