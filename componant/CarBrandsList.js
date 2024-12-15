import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import carBrands from "../data/carBrands";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const CarBrandsList = () => {
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleSelectedBrand = (brandId) => {
    setSelectedBrand(brandId);
  };

  return (
    <View>
      {/* <Text>CarBrandsList "Remove this later/or see if your going to label this list "</Text> */}
      {/* how to got to see all vehicals ? bottom tab ? */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {carBrands.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            style={[
              styles.brandCard,
              {
                backgroundColor:
                  selectedBrand === brand.id ? "#DFE4F0" : "#FFFFFF",
              },
            ]}
            onPress={() => handleSelectedBrand(brand.id)}
          >
            <View style={styles.iconContainer}>
              {/* <Image source={{ uri: brandIcon }} style={{ size: 32 }} /> */}
              <Icon name={brand.brandIcon} size={30} color="black" />
            </View>
            <Text style={styles.brandName}>{brand.brandName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CarBrandsList;

const styles = StyleSheet.create({
  brandCard: {
    alignItems: "center",
    marginTop:20,
    marginRight: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    // backgroundColor: "#DFE4F0",
    width: 120,
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconContainer: {
    marginBottom: 8,
  },
  brandName: {
    fontSize: 14,
    color: "#1B2128",
    fontWeight: "bold",
    textAlign: "center",
  },
});
