import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import DateTimeCalendar from "./DateTimeCalendar";
import { Picker } from "@react-native-picker/picker";
import TestDriveContext from "../context/TestDriveContext";

const SelectDateAndTime = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [TestDrive, setTestDrive] = useContext(TestDriveContext);
  const availableTimes = ["10:00 AM", "12:00 PM", "2:00 PM", "3:00 PM"];

  const openPicker = () => setIsPickerVisible(true);
  const closePicker = () => setIsPickerVisible(false);

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select a Date and Time</Text>
      <DateTimeCalendar />

      <TouchableOpacity style={styles.button} onPress={openPicker}>
        <Text style={styles.buttonText}>{selectedTime || "Select a Time"}</Text>
      </TouchableOpacity>

      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closePicker}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Time</Text>
            <Picker
              selectedValue={selectedTime}
              onValueChange={(itemValue) => {
                setSelectedTime(itemValue);
                setTestDrive({ ...TestDrive, time: itemValue });
              }}
            >
              <Picker.Item label="Select a Time" value="" />
              {availableTimes.map((time, index) => (
                <Picker.Item key={index} label={time} value={time} />
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

export default SelectDateAndTime;

const styles = StyleSheet.create({
  stepContainer: {
    padding: 20,
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
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
  button: {
    marginTop: 20,
    backgroundColor: "#1B2128",
    padding: 12,
    borderRadius: 8,
    width: "50%",
    height: "40",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
