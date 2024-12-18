import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  SafeAreaView,
  Dimensions,
  Animated,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import PdfGenerator from "../components/PdfGenerator";
import Icon from "react-native-vector-icons/Ionicons";
import Stepper from "react-native-stepper-ui";
import StaticImageHeader from "../components/StaticImageHeader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/auth";
import { getFinancers, createPaymentPlan } from "../api/paymentPlan";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const Purchases = ({ route }) => {
  const { vehicle } = route.params;
  const [active, setActive] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [downPayment, setDownPayment] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedFinancer, setSelectedFinancer] = useState("");
  const [financers, setFinancers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFinancers = async () => {
      const response = await getFinancers();
      setFinancers(response.financer);
      if (response.financer.length > 0) {
        setSelectedFinancer(response.financer[0]);
      }
    };

    fetchFinancers();
  }, []);

  const handleFinish = () => {
    navigation.navigate("Profile");
  };

  const handleDownPaymentChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setDownPayment(numericValue);
  };

  const {
    data: customer,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: getMyProfile,
  });

  console.log(selectedFinancer);
  const { mutate } = useMutation({
    mutationKey: ["createPaymentPlan"],
    mutationFn: () =>
      createPaymentPlan({
        customerId: customer.id,
        vehicleId: vehicle.id,
        financerId: selectedFinancer.id,
        totalAmount: vehicle.price - downPayment,
        lengthMonths: selectedDuration * 12,
      }),
    onSuccess: () => {
      Alert.alert("Purchase Complete!");
    },
    onError: () => {
      Alert.alert("Error", "Failed to create payment plan");
    },
  });

  if (isCustomerLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (customerError) {
    return (
      <View>
        <Text>Error loading data</Text>
      </View>
    );
  }

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

  const DownPaymentStep = (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Enter Down Payment</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={downPayment}
          onChangeText={handleDownPaymentChange}
          keyboardType="numeric"
          placeholder="Enter down payment"
          style={styles.input}
        />
      </View>
    </View>
  );

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
        <View style={[styles.detailRow, styles.lastDetailRow]}>
          <Icon name="pricetag-outline" size={24} color="#1B2128" />
          <Text style={styles.detailText}>Price: KD {vehicle.price}</Text>
        </View>
      </View>
    </View>
  );

  const PaymentPlanStep = ({ vehicle, customer, financers }) => {
    const [showFinancerDropdown, setShowFinancerDropdown] = useState(false);

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Payment Plan</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color="#1B2128"
            />
            <Text style={styles.detailText}>
              Name: {customer.firstName} {customer.lastName}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <AntDesign name="car" size={24} color="#1B2128" />
            <Text style={styles.detailText}>
              Vehicle: {vehicle.brand} {vehicle.model}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="finance" size={24} color="#1B2128" />
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowFinancerDropdown(true)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedFinancer ? selectedFinancer.name : "Select Financer"}
              </Text>
              <Icon name="chevron-down" size={20} color="#1B2128" />
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Icon name="calendar-outline" size={24} color="#1B2128" />
            <Text style={styles.detailText}>
              Length: {selectedDuration * 12} Months
            </Text>
          </View>
          <View style={[styles.detailRow, styles.lastDetailRow]}>
            <Icon name="pricetag-outline" size={24} color="#1B2128" />
            <Text style={styles.detailText}>
              Total Amount: KD {vehicle.price - downPayment}
            </Text>
          </View>
        </View>

        <Modal
          visible={showFinancerDropdown}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowFinancerDropdown(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowFinancerDropdown(false)}
          >
            <View style={styles.dropdownModal}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Select Financer</Text>
                <TouchableOpacity
                  onPress={() => setShowFinancerDropdown(false)}
                >
                  <Icon name="close" size={24} color="#1B2128" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={financers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      selectedFinancer?.id === item.id &&
                        styles.selectedDropdownItem,
                    ]}
                    onPress={() => {
                      setSelectedFinancer(item);
                      setShowFinancerDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedFinancer?.id === item.id &&
                          styles.selectedDropdownItemText,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  const SignatureStep = ({
    vehicle,
    customer,
    downPayment,
    length,
    financer,
  }) => {
    const [modalVisible, setModalVisible] = useState(false);

    if (!customer) {
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>
            Error: Customer data not available
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
            <PdfGenerator
              vehicle={vehicle}
              customer={customer}
              downpayment={downPayment}
              length={length}
              financer={financer}
            />
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.signatureButton}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="create-outline" size={24} color="#FFF" />
          <Text style={styles.signatureButtonText}>Open Signature</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ConfirmationStep = () => (
    <View style={styles.stepContainer}>
      <LinearGradient
        colors={["#1B2128", "#2D3540"]}
        style={styles.confirmationGradient}
      >
        <View style={styles.confirmationIconContainer}>
          <Icon name="checkmark-circle" size={60} color="#FFFFFF" />
        </View>
      </LinearGradient>
      <Text style={styles.confirmationTitle}>Purchase Confirmed!</Text>
      <Text style={styles.confirmationSubtitle}>
        Your vehicle purchase has been successfully processed
      </Text>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Icon name="time-outline" size={20} color="#1B2128" />
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryLabel}>Financing Duration</Text>
            <Text style={styles.summaryValue}>
              {selectedDuration} Year{selectedDuration > 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Icon name="cash-outline" size={20} color="#1B2128" />
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryLabel}>Down Payment</Text>
            <Text style={styles.summaryValue}>KD {downPayment}</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Icon name="car-outline" size={20} color="#1B2128" />
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryLabel}>Vehicle</Text>
            <Text style={styles.summaryValue}>
              {vehicle.brand} {vehicle.model}
            </Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Icon name="calendar-outline" size={20} color="#1B2128" />
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryLabel}>Year</Text>
            <Text style={styles.summaryValue}>{vehicle.year}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const content = [
    <FinancingDurationStep key="step1" />,
    DownPaymentStep,
    <VehicleDetailsStep key="step3" />,
    <PaymentPlanStep
      key="step4"
      vehicle={vehicle}
      customer={customer}
      financers={financers}
    />,
    <SignatureStep
      key="step5"
      vehicle={vehicle}
      customer={customer}
      downPayment={downPayment}
      length={selectedDuration}
      financer={selectedFinancer}
    />,
    <ConfirmationStep key="step6" />,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StaticImageHeader
        scrollY={scrollY}
        title="Confirm Purchase"
        subtitle={`${vehicle.brand} ${vehicle.model}`}
        backgroundColor="#1B2128"
        textColor="white"
        headerImage={vehicle.image2}
      />
      <View style={styles.stepperContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.stepsContainer}>
            {content.map((_, index) => (
              <View key={index} style={styles.stepRow}>
                <View
                  style={[
                    styles.stepCircle,
                    index === active && styles.activeStep,
                    index < active && styles.completedStep,
                  ]}
                >
                  {index < active ? (
                    <Icon name="checkmark" size={16} color="#fff" />
                  ) : (
                    <Text
                      style={[
                        styles.stepNumber,
                        index === active && styles.activeStepNumber,
                      ]}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                {index < content.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      index < active && styles.completedLine,
                    ]}
                  />
                )}
              </View>
            ))}
          </View>

          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {content[active]}
          </ScrollView>

          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[styles.navButton, active === 0 && styles.disabledButton]}
              onPress={() => setActive((p) => p - 1)}
              disabled={active === 0}
            >
              <Text style={[styles.buttonText, styles.previousButtonText]}>
                Previous
              </Text>
            </TouchableOpacity>

            {active === content.length - 1 ? (
              <TouchableOpacity
                style={[styles.navButton, styles.submitButton]}
                onPress={() => {
                  Alert.alert("Purchase Complete!");
                  mutate();
                  handleFinish();
                }}
              >
                <Text style={[styles.buttonText, styles.nextButtonText]}>
                  Complete Purchase
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={() => setActive((p) => p + 1)}
              >
                <Text style={[styles.buttonText, styles.nextButtonText]}>
                  Next
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B2128",
    marginTop: 0,
  },
  stepperContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 50,
    paddingTop: 20,
    paddingBottom: 20,
  },
  stepContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#1B2128",
    textAlign: "center",
  },
  durationButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  durationButton: {
    width: "48%",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E9F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedButton: {
    backgroundColor: "#1B2128",
    borderColor: "#1B2128",
  },
  durationButtonText: {
    color: "#1B2128",
    fontWeight: "600",
    fontSize: 15,
  },
  selectedButtonText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E9F0",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    gap: 0,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9F0",
  },
  detailText: {
    fontSize: 16,
    color: "#1B2128",
    marginLeft: 12,
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
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    marginTop: 8,
  },
  signatureButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
  confirmationGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 24,
  },
  confirmationIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B2128",
    textAlign: "center",
    marginBottom: 8,
  },
  confirmationSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  summaryContainer: {
    width: "100%",
    gap: 0,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9F0",
  },
  summaryTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B2128",
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
  navigationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    minWidth: 130,
    gap: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  nextButton: {
    backgroundColor: "#1B2128",
    borderWidth: 1.5,
    borderColor: "#E5E9F0",
  },
  backButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E5E9F0",
  },
  navigationButtonText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  backButtonText: {
    fontSize: 30,
    color: "#1B2128",
  },
  disabledButton: {
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  scrollContent: {
    flex: 1,
    marginBottom: 10,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: "#F5F5F5",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#DFE4F0",
  },
  activeStep: {
    backgroundColor: "#1B2128",
    borderColor: "#1B2128",
  },
  completedStep: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  stepNumber: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
  activeStepNumber: {
    color: "#FFFFFF",
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: "#DFE4F0",
    marginHorizontal: 5,
  },
  completedLine: {
    backgroundColor: "#28a745",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#F5F5F5",
  },
  navButton: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DFE4F0",
  },
  nextButton: {
    backgroundColor: "#1B2128",
    borderColor: "#1B2128",
  },
  submitButton: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  disabledButton: {
    backgroundColor: "#F5F7FA",
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  previousButtonText: {
    color: "#1B2128",
  },
  nextButtonText: {
    color: "#FFFFFF",
  },
  dropdownButton: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E9F0",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#1B2128",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownModal: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9F0",
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1B2128",
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E9F0",
  },
  selectedDropdownItem: {
    backgroundColor: "#1B2128",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#1B2128",
  },
  selectedDropdownItemText: {
    color: "#FFFFFF",
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
});

export default Purchases;
