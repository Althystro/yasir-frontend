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
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import PdfGenerator from "../components/PdfGenerator";
import Icon from "react-native-vector-icons/Ionicons";
import Stepper from "react-native-stepper-ui";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const Purchases = ({ route, navigation }) => {
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
            <Text
              style={[
                styles.durationButtonText,
                selectedDuration === year && styles.selectedButtonText,
              ]}
            >
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
      <View style={styles.inputContainer}>
        <Text style={styles.currencyPrefix}>KD</Text>
        <TextInput
          style={styles.input}
          value={downPayment}
          onChangeText={setDownPayment}
          placeholder="Enter amount"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );

  // Step 3: Vehicle Details Component
  const VehicleDetailsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Vehicle Details</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name="car-outline" size={24} color="#1B2128" />
          <Text style={styles.detailText}>Brand: {vehicle.brand}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="speedometer-outline" size={24} color="#1B2128" />
          <Text style={styles.detailText}>Model: {vehicle.model}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="calendar-outline" size={24} color="#1B2128" />
          <Text style={styles.detailText}>Year: {vehicle.year}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="pricetag-outline" size={24} color="#1B2128" />
          <Text style={styles.detailText}>Price: KD {vehicle.price}</Text>
        </View>
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
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sign Document</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={24} color="#1B2128" />
              </TouchableOpacity>
            </View>
            <PdfGenerator vehicle={vehicle} />
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.signatureButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="create-outline" size={24} color="#FFF" />
          <Text style={styles.buttonText}>Open Signature</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Step 5: Confirmation Component
  const ConfirmationStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.confirmationIconContainer}>
        <Icon name="checkmark-circle" size={80} color="#1B2128" />
      </View>
      <Text style={styles.confirmationTitle}>Purchase Confirmed!</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Icon name="time-outline" size={24} color="#1B2128" />
          <Text style={styles.summaryText}>
            Financing Duration: {selectedDuration} Year
            {selectedDuration > 1 ? "s" : ""}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Icon name="cash-outline" size={24} color="#1B2128" />
          <Text style={styles.summaryText}>Down Payment: KD {downPayment}</Text>
        </View>
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
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: vehicle.image2 }}
        style={styles.headerBackground}
      >
        <LinearGradient
          colors={["rgba(27, 33, 40, 0.7)", "rgba(27, 33, 40, 0.9)"]}
          style={styles.gradient}
        >
          <SafeAreaView style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Confirm Purchase</Text>
            <View style={styles.backButton} />
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>

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
          connectorStyle={styles.connectorStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerBackground: {
    height: 200,
    width: width,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  stepperContainer: {
    flex: 1,
    padding: 20,
    marginTop: -40,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  stepContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#1B2128",
    textAlign: "center",
  },
  durationButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  durationButton: {
    width: "45%",
    padding: 15,
    backgroundColor: "#F5F7FA",
    borderRadius: 15,
    alignItems: "center",
    margin: 5,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedButton: {
    backgroundColor: "#1B2128",
  },
  durationButtonText: {
    color: "#1B2128",
    fontWeight: "600",
    fontSize: 16,
  },
  selectedButtonText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F5F7FA",
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  currencyPrefix: {
    fontSize: 16,
    color: "#1B2128",
    fontWeight: "600",
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#1B2128",
  },
  detailsContainer: {
    width: "100%",
    gap: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    padding: 15,
    borderRadius: 12,
    gap: 15,
  },
  detailText: {
    fontSize: 16,
    color: "#1B2128",
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  signatureButton: {
    backgroundColor: "#1B2128",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  confirmationIconContainer: {
    backgroundColor: "#F5F7FA",
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  confirmationTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1B2128",
    marginVertical: 20,
    textAlign: "center",
  },
  summaryContainer: {
    width: "100%",
    gap: 15,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    padding: 15,
    borderRadius: 12,
    gap: 15,
  },
  summaryText: {
    fontSize: 16,
    color: "#1B2128",
    flex: 1,
  },
  stepStyle: {
    backgroundColor: "#F5F7FA",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#DFE4F0",
  },
  stepTextStyle: {
    color: "#1B2128",
    fontSize: 16,
    fontWeight: "600",
  },
  activeStepStyle: {
    backgroundColor: "#1B2128",
    borderColor: "#1B2128",
  },
  activeStepTextStyle: {
    color: "white",
  },
  connectorStyle: {
    backgroundColor: "#DFE4F0",
    height: 2,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DFE4F0",
    backgroundColor: "#F5F7FA",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B2128",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DFE4F0",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Purchases;
