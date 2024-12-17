// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Platform,
//   Linking,
// } from "react-native";
// import React, { useState } from "react";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import MapView, { Marker } from "react-native-maps";

// const TestDrive = () => {
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const dealershipLocation = {
//     latitude: "29.313181",
//     longitude: "47.931523",
//     latitudeDelta: "0.0922",
//     longitudeDelta: "0.0421",
//   };

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(Platform.OS === "ios");
//     setDate(currentDate);
//   };

//   const showDatepicker = () => {
//     setShowDatePicker(true);
//   };

//   const handleOpenMaps = () => {
//     const url = `https://www.google.com/maps/search/?api=1&query=${dealershipLocation.latitude},${dealershipLocation.longitude}`;
//     Linking.openURL(url);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Schedule a Test Drive</Text>

//       <View style={styles.dateContainer}>
//         <Text style={styles.label}>Select Date and Time:</Text>
//         <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
//           <Text style={styles.dateButtonText}>{date.toLocaleString()}</Text>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             testID="dateTimePicker"
//             value={date}
//             mode="datetime"
//             is24Hour={true}
//             display="default"
//             onChange={onChange}
//             minimumDate={new Date()}
//           />
//         )}
//       </View>

//       <View style={styles.mapContainer}>
//         <Text style={styles.label}>Dealership Location:</Text>
//         <MapView style={styles.map} initialRegion={dealershipLocation}>
//           <Marker
//             coordinate={{
//               latitude: dealershipLocation.latitude,
//               longitude: dealershipLocation.longitude,
//             }}
//             title="Toyota Dealership"
//             description="Come visit us here!"
//           />
//         </MapView>
//         <TouchableOpacity
//           style={styles.directionsButton}
//           onPress={handleOpenMaps}
//         >
//           <Text style={styles.buttonText}>Get Directions</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.scheduleButton}>
//         <Text style={styles.buttonText}>Schedule Test Drive</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default TestDrive;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333",
//   },
//   dateContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 10,
//     color: "#666",
//   },
//   dateButton: {
//     backgroundColor: "#f5f5f5",
//     padding: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   dateButtonText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   mapContainer: {
//     flex: 1,
//     marginBottom: 20,
//   },
//   map: {
//     width: "100%",
//     height: 300,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   directionsButton: {
//     backgroundColor: "#2196F3",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   scheduleButton: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

import React, { useState } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";

import Stepper from "react-native-stepper-ui";
import SelectDateAndTime from "./SelectDateAndTime";
import Confirmation from "./Confirmation";

const TestDrive = ({ route }) => {
  const { vehicle } = route.params;
  const [active, setActive] = useState(0);
  const content = [
    <SelectDateAndTime vehicle={vehicle} />,
    // <DealershipSelector />,
    <Confirmation vehicle={vehicle} />,
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.midSection}>
        <Text style={styles.headerText}>Book a Test Drive</Text>
      </View>
      <View style={styles.bottomSection}>
        <Stepper
          active={active}
          content={content}
          onFinish={() => alert("Finish")}
          onNext={() => setActive((p) => p + 1)}
          onBack={() => setActive((p) => p - 1)}
          buttonStyle={{
            backgroundColor: "black",
            marginTop: 250,
            width: "50%",
            borderRadius: 20,
          }}
          buttonTextStyle={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "600",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  selectedText2: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontStyle: "italic",
  },
  topSection: {
    height: 200,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
  },
  midSection: {
    backgroundColor: "#1B2128",
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    paddingTop: 60,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  bottomSection: {
    backgroundColor: "white",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },

  pickerContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  picker: {
    backgroundColor: Platform.OS === "ios" ? "#f5f5f5" : undefined,
    borderWidth: Platform.OS === "android" ? 1 : 0,
    borderColor: "#ddd",
    borderRadius: Platform.OS === "android" ? 8 : 0,
  },
  selectedTimeText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontStyle: "italic",
  },
});

export default TestDrive;

// import React, { useState } from "react";
// import {
//   Modal,
//   Platform,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// const SelectDateAndTime = () => {
//   const [selectedTime, setSelectedTime] = useState("");
//   const [isPickerVisible, setIsPickerVisible] = useState(false); // Control modal visibility
//   const availableTimes = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

//   const openPicker = () => setIsPickerVisible(true);
//   const closePicker = () => setIsPickerVisible(false);

//   return (
//     <View style={styles.stepContainer}>
//       <Text style={styles.stepTitle}>Select a Date and Time</Text>

//       {/* Button to open the picker */}
//       <TouchableOpacity style={styles.button} onPress={openPicker}>
//         <Text style={styles.buttonText}>{selectedTime || "Select a Time"}</Text>
//       </TouchableOpacity>

//       {/* Modal with Picker */}
//       <Modal
//         visible={isPickerVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={closePicker}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Pick a Time</Text>
//             <Picker
//               selectedValue={selectedTime}
//               onValueChange={(itemValue) => setSelectedTime(itemValue)}
//             >
//               <Picker.Item label="Select a Time" value="" />
//               {availableTimes.map((time, index) => (
//                 <Picker.Item key={index} label={time} value={time} />
//               ))}
//             </Picker>

//             {/* Done button */}
//             <TouchableOpacity style={styles.doneButton} onPress={closePicker}>
//               <Text style={styles.doneButtonText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {selectedTime ? (
//         <Text style={styles.selectedTimeText}>
//           Selected Time: {selectedTime}
//         </Text>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   stepContainer: {
//     padding: 20,
//   },
//   stepTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   button: {
//     backgroundColor: "#1B2128",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     width: "80%",
//     borderRadius: 10,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   doneButton: {
//     marginTop: 10,
//     backgroundColor: "#1B2128",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   doneButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   selectedTimeText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: "#333",
//     fontStyle: "italic",
//   },
// });

// export default SelectDateAndTime;
