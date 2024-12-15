import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const VehicleDetails = ({ route, navigation }) => {
  const { vehicle } = route.params;
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const calculateMonthlyPayment = () => {
    if (!vehicle || !downPayment || !loanTerm) return 0;

    const carPrice = vehicle.price; // Price is already a number
    const principal = carPrice - parseInt(downPayment);
    const monthlyInterest = 0.05 / 12; // 5% annual interest rate
    const numberOfPayments = parseInt(loanTerm) * 12;

    const monthlyPayment =
      (principal *
        monthlyInterest *
        Math.pow(1 + monthlyInterest, numberOfPayments)) /
      (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

    return monthlyPayment.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.midSection}>
        <Text
          style={styles.midText}
        >{`${vehicle.brand} ${vehicle.model}`}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="car-sport" size={24} color="white" />
            <Text style={styles.detailText}>{vehicle.type}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={24} color="white" />
            <Text style={styles.detailText}>{vehicle.year}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.labelText}>Vehicle Information</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featuresCard}>
            <Ionicons name="car" size={24} color="#1B2128" />
            <Text style={styles.featuresText}>Type: {vehicle.type}</Text>
          </View>
          <View style={styles.featuresCard}>
            <Ionicons name="business" size={24} color="#1B2128" />
            <Text style={styles.featuresText}>Brand: {vehicle.brand}</Text>
          </View>
          <View style={styles.featuresCard}>
            <Ionicons name="speedometer" size={24} color="#1B2128" />
            <Text style={styles.featuresText}>Model: {vehicle.model}</Text>
          </View>
        </View>

        <View style={styles.calculatorSection}>
          <Text style={styles.calculatorTitle}>Finance Calculator</Text>
          <View style={styles.calculatorInputs}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Down Payment ($)</Text>
              <TextInput
                style={styles.input}
                value={downPayment}
                onChangeText={setDownPayment}
                keyboardType="numeric"
                placeholder="1000"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Loan Term (years)</Text>
              <TextInput
                style={styles.input}
                value={loanTerm}
                onChangeText={setLoanTerm}
                keyboardType="numeric"
                placeholder="5"
              />
            </View>
          </View>
          {downPayment && loanTerm && (
            <Text style={styles.monthlyPayment}>
              Monthly Payment: ${calculateMonthlyPayment()}
            </Text>
          )}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.labelPriceText}>Price:</Text>
          <Text style={styles.priceText}>
            KD {vehicle.price.toLocaleString()}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.testDriveButton]}
              onPress={() =>
                navigation.navigate("Test Drive", { vehicle: vehicle })
              }
            >
              <Ionicons
                name="car-sport"
                size={20}
                color="#ffffff"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Book A Test Drive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buyNowButton]}
              onPress={() =>
                navigation.navigate("Pdf Generator", { vehicle: vehicle })
              }
            >
              <Ionicons
                name="cart"
                size={20}
                color="#ffffff"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topSection: {
    height: 200,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#ffffff",
  },
  midSection: {
    flex: 1,
    backgroundColor: "#1B2128",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    zIndex: 1,
  },
  bottomSection: {
    flex: 3.5,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  carButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
    width: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCarButton: {
    backgroundColor: "#e8f0fe",
    borderColor: "#1B2128",
    borderWidth: 2,
  },
  carImage: {
    width: 160,
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
  },
  carButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  carButtonPrice: {
    fontSize: 14,
    color: "#666",
  },
  midText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  detailItem: {
    alignItems: "center",
  },
  detailText: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  featuresCard: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 20,
    width: "30%",
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1B2128",
    textAlign: "center",
    marginTop: 10,
  },
  calculatorSection: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  calculatorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  calculatorInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    width: "45%",
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 5,
    color: "#666",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  monthlyPayment: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
    color: "#1B2128",
  },
  labelText: {
    fontSize: 20,
    color: "#404040",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  priceContainer: {
    marginTop: 20,
  },
  labelPriceText: {
    fontSize: 15,
    color: "#404040",
  },
  priceText: {
    fontSize: 40,
    color: "#1B2128",
    fontWeight: "900",
  },
  placeHolderText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
    color: "#666",
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  testDriveButton: {
    backgroundColor: "#1B2128",
  },
  buyNowButton: {
    backgroundColor: "#2E5BE3",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
});
