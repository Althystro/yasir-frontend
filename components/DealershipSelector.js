import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import TestDriveContext from "../context/TestDriveContext";

const DealershipSelector = () => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedDealership, setSelectedDealership] = useState("");
  const [TestDrive, setTestDrive] = useContext(TestDriveContext);

  const dealerships = [
    { id: 1, name: "Dealership A" },
    { id: 2, name: "Dealership B" },
    { id: 3, name: "Dealership C" },
  ];

  const openPicker = () => setIsPickerVisible(true);
  const closePicker = () => setIsPickerVisible(false);

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
              {dealerships.map((dealership) => (
                <Picker.Item
                  key={dealership.id}
                  label={dealership.name}
                  value={dealership.name}
                />
              ))}
            </Picker>

            <TouchableOpacity style={styles.doneButton} onPress={closePicker}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DealershipSelector;

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
