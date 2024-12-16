import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import PdfGenerator from "../components/PdfGenerator";
import Icon from "react-native-vector-icons/Ionicons";
import Stepper from "react-native-stepper-ui";

const Purchases = ({ route }) => {
  const { vehicle } = route.params;
  const [active, setActive] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [downPayment, setDownPayment] = useState("");

  // Step 1: Financing Duration Component
  const FinancingDurationStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Financing Duration</Text>
      <View style={styles.durationButtons}>
        {[1, 2, 3, 4, 5, 6].map((year) => (
          <TouchableOpacity
            key={year}
            style={[
              styles.durationButton,
              selectedDuration === year && styles.selectedButton,
            ]}
            onPress={() => setSelectedDuration(year)}
          >
            <Text style={styles.durationButtonText}>
              {year} Year{year > 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Step 2: Down Payment Component
  const DownPaymentStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Set Down Payment Amount</Text>
      <TextInput
        style={styles.input}
        value={downPayment}
        onChangeText={setDownPayment}
        placeholder="Enter amount"
        keyboardType="numeric"
      />
    </View>
  );

  // Step 3: Vehicle Details Component
  const VehicleDetailsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Vehicle Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Brand: {vehicle.brand}</Text>
        <Text style={styles.detailText}>Model: {vehicle.model}</Text>
        <Text style={styles.detailText}>Year: {vehicle.year}</Text>
        <Text style={styles.detailText}>Price: KD {vehicle.price}</Text>
      </View>
    </View>
  );

  // Step 4: Signature Component
  const SignatureStep = ({ vehicle }) => {
    if (!vehicle) {
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>
            Error: Vehicle data not available
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Sign Documents</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <PdfGenerator vehicle={vehicle} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Open Signature</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Step 5: Confirmation Component
  const ConfirmationStep = () => (
    <View style={styles.stepContainer}>
      <Icon name="checkmark-circle" size={80} color="#1B2128" />
      <Text style={styles.confirmationTitle}>Purchase Confirmed!</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Financing Duration: {selectedDuration} Year
          {selectedDuration > 1 ? "s" : ""}
        </Text>
        <Text style={styles.summaryText}>Down Payment: KD {downPayment}</Text>
      </View>
    </View>
  );

  const content = [
    <FinancingDurationStep />,
    <DownPaymentStep />,
    <VehicleDetailsStep />,
    <SignatureStep vehicle={vehicle} />,
    <ConfirmationStep />,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Confirm Purchase</Text>
      </View>
      <View style={styles.stepperContainer}>
        <Stepper
          active={active}
          content={content}
          onBack={() => setActive((p) => p - 1)}
          onNext={() => setActive((p) => p + 1)}
          onFinish={() => Alert.alert("Purchase Complete!")}
          stepStyle={styles.stepStyle}
          stepTextStyle={styles.stepTextStyle}
          activeStepStyle={styles.activeStepStyle}
          activeStepTextStyle={styles.activeStepTextStyle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#1B2128",
    padding: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  stepperContainer: {
    flex: 1,
    padding: 20,
  },
  stepContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1B2128",
  },
  durationButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  durationButton: {
    width: "45%",
    padding: 15,
    backgroundColor: "#DFE4F0",
    borderRadius: 10,
    alignItems: "center",
    margin: 5,
  },
  selectedButton: {
    backgroundColor: "#1B2128",
  },
  durationButtonText: {
    color: "#1B2128",
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#DFE4F0",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  detailsContainer: {
    width: "100%",
    gap: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#1B2128",
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#1B2128",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B2128",
    marginVertical: 20,
  },
  summaryContainer: {
    width: "100%",
    gap: 10,
  },
  summaryText: {
    fontSize: 16,
    color: "#1B2128",
  },
  stepStyle: {
    backgroundColor: "#DFE4F0",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1B2128",
  },
  stepTextStyle: {
    color: "#1B2128",
  },
  activeStepStyle: {
    backgroundColor: "#1B2128",
  },
  activeStepTextStyle: {
    color: "white",
  },
});

export default Purchases;
