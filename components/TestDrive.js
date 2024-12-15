import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";

const TestDrive = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dealershipLocation = {
    latitude: "29.313181",
    longitude: "47.931523",
    latitudeDelta: "0.0922",
    longitudeDelta: "0.0421",
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${dealershipLocation.latitude},${dealershipLocation.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule a Test Drive</Text>

      <View style={styles.dateContainer}>
        <Text style={styles.label}>Select Date and Time:</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
          <Text style={styles.dateButtonText}>{date.toLocaleString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.mapContainer}>
        <Text style={styles.label}>Dealership Location:</Text>
        <MapView style={styles.map} initialRegion={dealershipLocation}>
          <Marker
            coordinate={{
              latitude: dealershipLocation.latitude,
              longitude: dealershipLocation.longitude,
            }}
            title="Toyota Dealership"
            description="Come visit us here!"
          />
        </MapView>
        <TouchableOpacity
          style={styles.directionsButton}
          onPress={handleOpenMaps}
        >
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.scheduleButton}>
        <Text style={styles.buttonText}>Schedule Test Drive</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestDrive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  dateContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#666",
  },
  dateButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  mapContainer: {
    flex: 1,
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  directionsButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  scheduleButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
