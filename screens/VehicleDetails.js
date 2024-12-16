import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import cars from "../data/cars";
import { Ionicons } from "@expo/vector-icons";

const VehicleDetails = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState("");

  const handleSelectedCar = (car) => {
    setSelectedCar(car);
  };

  const calculateMonthlyPayment = () => {
    if (!selectedCar || !downPayment || !loanTerm) return 0;

    const carPrice = parseInt(selectedCar.price.replace(/\$|,/g, ""));
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
        {selectedCar ? (
          <>
            <Text style={styles.midText}>{selectedCar.name}</Text>
            {/* <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Ionicons name="car-sport" size={24} color="white" />
                <Text style={styles.detailText}>{selectedCar.engine}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="speedometer" size={24} color="white" />
                <Text style={styles.detailText}>
                  {selectedCar.fuelEfficiency}
                </Text>
              </View>
            </View> */}
          </>
        ) : (
          <Text style={styles.midText}>Choose a car</Text>
        )}

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.carButton,
                selectedCar?.id === item.id && styles.selectedCarButton,
              ]}
              onPress={() => handleSelectedCar(item)}
            >
              <Image source={{ uri: item.image }} style={styles.carImage} />
              <Text style={styles.carButtonText}>{item.name}</Text>
              <Text style={styles.carButtonPrice}>{item.price}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <ScrollView style={styles.cardContainer}>
        {selectedCar ? (
          <>
            <Text style={styles.labelText}>Features</Text>
            <View style={styles.featuresContainer}>
              {selectedCar.features.map((feature, index) => (
                <View style={styles.featuresCard} key={index}>
                  <Ionicons
                    name={
                      index === 0
                        ? "car"
                        : index === 1
                        ? "sunny"
                        : "shield-checkmark"
                    }
                    size={24}
                    color="#1B2128"
                  />
                  <Text style={styles.featuresText}>{feature}</Text>
                </View>
              ))}
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
                    placeholder="10000"
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
              <Text style={styles.labelPriceText}>Starting From:</Text>
              <Text style={styles.priceText}>{selectedCar.price}</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:30}}>


        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get the Car</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.testButton} >
          <Text style={styles.buttonText}>Book Test Drive</Text>
        </TouchableOpacity>


            </View>
          </>
        ) : (
          <Text style={styles.placeHolderText}>
            Select a car to see details
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  midSection: {
    flex: 0.8, 
    backgroundColor: "#1B2128",
    backgroundColor: "red",
    borderBottomRightRadius: 65,
    borderBottomLeftRadius: 65,
    paddingHorizontal: 20,
    marginTop:50
    
  },
  carButton: {
    backgroundColor: "yellow",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
    width: 100,
    height: 50,
    alignItems: "center",
  },
  selectedCarButton: {
    backgroundColor: "#e8f0fe",
    borderColor: "#1B2128",
    borderWidth: 2,

  },
  carButtonText: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  carButtonPrice: {
    fontSize: 10,
    color: "#666",
  },
  midText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  // detailsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   marginTop: 20,
  // },
  // detailItem: {
  //   alignItems: "center",
  // },
  // detailText: {
  //   color: "white",
  //   marginTop: 5,
  //   fontSize: 12,
  //   textAlign: "center",
  // },
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
  placeHolderText: {
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
    color: "#666",
  },
  button: {
    width: 150,
    height:50,
    backgroundColor: "#1B2128",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  testButton: {
    width: 150,
    height:50,
    backgroundColor: "#1B2128",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginLeft:60
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
