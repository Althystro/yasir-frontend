import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FlatList } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import TestDriveContext from "../context/TestDriveContext";
import carBrands from "../data/carBrands";
import cars from "../data/cars";

const DealershipCarSelector = () => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isCarPickerVisible, setIsCarPickerVisible] = useState(false);
  const [selectedDealership, setSelectedDealership] = useState("");
  const [selectedCar, setSelectedCar] = useState("");
  const [TestDrive, setTestDrive] = useContext(TestDriveContext);

  const openPicker = () => setIsPickerVisible(true);
  const closePicker = () => setIsPickerVisible(false);

  const openCarPicker = () => setIsCarPickerVisible(true);
  const closeCarPicker = () => setIsCarPickerVisible(false);

  return (
    <View style={styles.container}>
      {/* Icon and Label */}
      <View style={styles.iconContainer}>
        <MaterialIcons name="location-on" size={24} color="black" />
        <Text style={styles.label}>Select a Dealership</Text>
      </View>
      <TouchableOpacity style={styles.selector} onPress={openPicker}>
        <Text style={styles.selectorText}>
          {selectedDealership || "Choose Dealership"}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closePicker}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Dealership</Text>
            <Picker
              selectedValue={selectedDealership}
              onValueChange={(itemValue) => {
                setSelectedDealership(itemValue);
                setTestDrive({ ...TestDrive, dealership: itemValue });
              }}
            >
              <Picker.Item label="Select a Dealership" value="" />
              {carBrands.map((brand) => (
                <Picker.Item
                  key={brand.id}
                  label={brand.brandName}
                  value={brand.brandName}
                />
              ))}
            </Picker>

            <TouchableOpacity style={styles.doneButton} onPress={closePicker}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Car Selector */}
      <View style={styles.iconContainer}>
        <FontAwesome5 name="car-side" size={24} color="black" />
        <Text style={styles.label}>Select a Car</Text>
      </View>
      <TouchableOpacity style={styles.selector} onPress={openCarPicker}>
        <Text style={styles.selectorText}>{selectedCar || "Choose Car"}</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal
        visible={isCarPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCarPicker}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Car</Text>
            <Picker
              selectedValue={selectedCar}
              onValueChange={(itemValue) => {
                setSelectedCar(itemValue);
                setTestDrive({ ...TestDrive, car: itemValue });
              }}
            >
              <Picker.Item label="Select a Car" value="" />
              {cars.map((car) => (
                <Picker.Item key={car.id} label={car.name} value={car.name} />
              ))}
            </Picker>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={closeCarPicker}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DealershipCarSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  selector: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  selectorText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
  },
  modalCloseButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 16,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontStyle: "italic",
  },
  doneButton: {
    marginTop: 10,
    backgroundColor: "#1B2128",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
