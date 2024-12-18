import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

import AnimatedHeader from "../components/AnimatedHeader";

const VehicleDetails = ({ route, navigation }) => {
  const { vehicle } = route.params;
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;

  const defaultColors = [
    { name: "Pearl White", code: "#FFFFFF" },
    { name: "Midnight Black", code: "#000000" },
    { name: "Racing Red", code: "#FF0000" },
    { name: "Ocean Blue", code: "#0000FF" },
    { name: "Silver Grey", code: "#C0C0C0" },
    { name: "Forest Green", code: "#228B22" },
    { name: "Metallic Bronze", code: "#CD7F32" },
    { name: "Royal Purple", code: "#7851A9" },
    { name: "Champagne Gold", code: "#F7E7CE" },
    { name: "Electric Blue", code: "#7DF9FF" },
    { name: "Burgundy Red", code: "#800020" },
    { name: "Graphite Grey", code: "#383838" },
    { name: "Mystic Brown", code: "#614051" },
    { name: "Pearl Orange", code: "#FFA500" },
    { name: "Cosmic Black", code: "#202020" },
  ];

  const colors = vehicle.colors || defaultColors;

  const calculateMonthlyPayment = () => {
    if (!vehicle || !downPayment || !loanTerm) return 0;

    const carPrice = vehicle.price;
    const principal = carPrice - parseInt(downPayment);
    const numberOfPayments = parseInt(loanTerm) * 12;

    const monthlyPayment = principal / numberOfPayments;

    return monthlyPayment.toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedHeader
        scrollY={scrollY}
        title={`${vehicle.brand} ${vehicle.model}`}
        subtitle={vehicle.name}
        backgroundColor="#1B2128"
        textColor="white"
        headerImage={vehicle.image2}
      >
        <View style={styles.bottomSection}>
          <Text style={styles.labelText}>Vehicle Information</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featuresCard}>
              <Ionicons name="car" size={24} color="#1B2128" />
              <Text style={styles.featuresLabel}>Type</Text>
              <Text style={styles.featuresText}>{vehicle.type}</Text>
            </View>
            <View style={styles.featuresCard}>
              <Ionicons name="business" size={24} color="#1B2128" />
              <Text style={styles.featuresLabel}>Brand</Text>
              <Text style={styles.featuresText}>{vehicle.brand}</Text>
            </View>
            <View style={styles.featuresCard}>
              <Ionicons name="calendar" size={24} color="#1B2128" />
              <Text style={styles.featuresLabel}>Year</Text>
              <Text style={styles.featuresText}>{vehicle.year}</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <View style={styles.infoCard}>
              <View style={styles.infoHeaderContainer}>
                <Ionicons name="information-circle" size={24} color="#1B2128" />
                <Text style={styles.infoTitle}>Description</Text>
              </View>
              <Text style={styles.infoText}>{vehicle.description}</Text>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.infoHeaderContainer}>
                <Ionicons name="speedometer" size={24} color="#1B2128" />
                <Text style={styles.infoTitle}>Engine</Text>
              </View>
              <Text style={styles.infoText}>{vehicle.engine}</Text>
            </View>

            <View style={styles.colorSection}>
              <View style={styles.infoHeaderContainer}>
                <Ionicons name="color-palette" size={24} color="#1B2128" />
                <Text style={styles.infoTitle}>Available Colors</Text>
              </View>
              <View style={styles.colorPaletteContainer}>
                {colors.map((color, index) => (
                  <View key={index} style={styles.colorItem}>
                    <View style={styles.colorCircleContainer}>
                      <View
                        style={[
                          styles.colorCircle,
                          { backgroundColor: color.code },
                          color.code === "#FFFFFF" && styles.whiteColorBorder,
                        ]}
                      />
                      <View style={styles.shine} />
                    </View>
                    <Text style={styles.colorName}>{color.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.calculatorSection}>
            <Text style={styles.calculatorTitle}>Finance Calculator</Text>
            <View style={styles.calculatorInputs}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Down Payment (KD)</Text>
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
                Monthly Payment: KD {calculateMonthlyPayment()}
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
                <Text style={styles.buttonText}>Test Drive</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buyNowButton]}
                onPress={() =>
                  navigation.navigate("Purchases", { vehicle: vehicle })
                }
              >
                <Ionicons
                  name="cart"
                  size={20}
                  color="#black"
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonBuyNowText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </AnimatedHeader>
    </SafeAreaView>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#1B2128",
    marginTop: -40,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  featuresCard: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 20,
    width: "31%",
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  featuresText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B2128",
    textAlign: "center",
    marginTop: 4,
    paddingHorizontal: 4,
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
    marginTop: 10,
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    flex: 1,
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
    backgroundColor: "#DFE4F0",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  buttonBuyNowText: {
    color: "#1B2128",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
  descriptionSection: {
    marginTop: 20,
    gap: 15,
  },
  infoCard: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B2128",
    marginLeft: 8,
  },
  infoText: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  colorSection: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 20,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorPaletteContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 10,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  colorItem: {
    alignItems: "center",
    width: 65,
    marginBottom: 15,
  },
  colorCircleContainer: {
    position: "relative",
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transform: [{ rotate: "45deg" }],
    width: "100%",
    height: "50%",
    opacity: 0.5,
  },
  whiteColorBorder: {
    borderWidth: 1.5,
    borderColor: "#CCCCCC",
  },
  colorName: {
    fontSize: 10,
    color: "#4B5563",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 4,
  },
});
