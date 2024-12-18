import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Stepper from "react-native-stepper-ui";
import SelectDateAndTime from "./SelectDateAndTime";
import Confirmation from "./Confirmation";
import DealershipCarSelector from "./DealershipCarSelector";

const content = [
  <SelectDateAndTime />,
  <DealershipCarSelector />,
  <Confirmation />,
];

const TestDriveVehicle = () => {
  const [active, setActive] = useState(0);
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
  container2: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  picker2: {
    height: 50,
    color: "#333",
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

export default TestDriveVehicle;
