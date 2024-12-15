import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import cars from "../data/cars";

const VehicleDetails = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSelectedCar = (car) => {
    setSelectedCar(car);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        {/* What will be added here the profile ? */}
        {/* the FlatList part will be deleted later it only for me :) */}
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.carButton}
              onPress={() => handleSelectedCar(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.midSection}>
        {/* Only for the logo moto */}
        <Text style={styles.midText}>
          {selectedCar ? selectedCar.name : "Choose a car"}
        </Text>
        {/* <Text style={{ color: "white" }}>Vroom</Text> */}
      </View>

      {/* Containes all cards */}
      <View style={styles.bottomSection}>
        {/* Add the price / features / the caclulater thingy later ? maybe / button to buy */}

        {selectedCar ? (
          <>
            <Text style={styles.labelText}>Features</Text>

            <View style={styles.featuresContainer}>
              {selectedCar.features.slice(0, 3).map((feature, index) => (
                <View style={styles.featuresCard} key={index}>
                  <Text style={styles.featuresText}>{feature}</Text>
                </View>
              ))}
            </View>
            <View style={styles.calculaterSection}>
              <Text style={{ fontSize: 30, fontWeight: 30 }}>Calculater ?</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.labelPriceText}>Starting From:</Text>
              <Text style={styles.priceText}>{selectedCar.price}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.placeHolderText}>
            select a Car to see details
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VehicleDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  topSection: {
    flex: 0.6,
    backgroundColor: "#ffffff",
    // backgroundColor: "red",
  },
  midSection: {
    flex: 1,
    backgroundColor: "#1B2128",
    // backgroundColor: "blue",
    marginTop: -40,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    justifyContent: "center",
    // alignItems: "center",
  },
  bottomSection: {
    flex: 3.5,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -30,
    paddingHorizontal: 20, 
    // alignContent: "flex-start",
  },
  midText: {
    marginLeft:20,
    marginBottom:40,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  featuresContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  featuresCard: {
    flexDirection: "row",
    padding: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    // marginTop:40,
    // marginRight: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    width: 120,
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  carButton: {
    backgroundColor: "yellow",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  featuresText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  labelText: {
    marginLeft: 2,
    marginTop: 90,
    marginBottom: 5,
    fontSize: 20,
    color: "#404040",
    fontWeight: "bold",
    // marginBottom: 30,
  },
  priceContainer: {
    marginTop: 20,
  },
  labelPriceText: {
    marginLeft: 25,
    fontSize: 15,
    color: "#404040",
    // fontWeight: "bold",
    // marginBottom: 30,
  },
  priceText: {
    marginLeft: 25,
    fontSize: 50,
    color: "#1B2128",
    fontWeight: "900",
    // marginBottom: 30,
  },
  placeHolderText: {
    fontSize: 18,
    marginTop: 20,
  },
  calculaterSection: {
    backgroundColor: "#f7f0f0",
    alignItems: "center",
    marginTop: 20,
    marginRight: 15,
    marginBottom:20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    width: 370,
    height: 120,
  },
});
