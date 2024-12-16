import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getVehicleById } from "../api/vehicles";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

const useTypingAnimation = (text, speed = 1) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      return;
    }

    setIsTyping(true);
    let index = 0;
    setDisplayedText("");

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((current) => current + text.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isTyping };
};

const RecomendationCard = ({ aiResponse, setModalVisible }) => {
  const navigation = useNavigation();
  const { displayedText, isTyping } = useTypingAnimation(
    aiResponse?.reasons || ""
  );

  const { data: vehicleById, isLoading } = useQuery({
    queryKey: ["vehicleById", aiResponse?.id],
    queryFn: () => getVehicleById(aiResponse?.id),
    enabled: !!aiResponse?.id,
  });

  //   useEffect(() => {
  //     if (vehicleById) {
  //       console.log("Vehicle Data Retrieved:", vehicleById);
  //     }
  //   }, [vehicleById]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading vehicle details...</Text>
      </View>
    );
  }

  if (!vehicleById) {
    return null;
  }

  const handlePress = () => {
    setModalVisible(false);
    navigation.navigate("Vehicle Details", { vehicle: vehicleById.vehicle });
  };

  return (
    <View style={styles.responseContainer}>
      <Text style={styles.responseTitle}>
        Recommended Car
        {isTyping && <Text style={styles.typingIndicator}>...</Text>}
      </Text>

      <TouchableOpacity onPress={handlePress} style={styles.carInfoContainer}>
        {vehicleById.vehicle.image && (
          <Image
            source={{ uri: vehicleById.vehicle.image }}
            style={styles.carImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.carName}>
          {vehicleById.vehicle.brand} {vehicleById.vehicle.model}{" "}
          {vehicleById.vehicle.year}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price:</Text>
          <Text style={styles.carPrice}>
            ${Number(vehicleById.vehicle.price).toLocaleString()}
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Monthly Installment:</Text>
          <Text style={styles.carPrice}>
            ${Number(aiResponse.installments).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.reasonsTitle}>Why this car?</Text>
      <Text style={styles.responseText}>{displayedText}</Text>
    </View>
  );
};

export default RecomendationCard;

const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  responseContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  carInfoContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  priceLabel: {
    fontSize: 16,
    color: "#666",
  },
  carName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  carPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#28a745",
  },
  reasonsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  responseTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  typingIndicator: {
    color: "#666",
    fontSize: 24,
    marginLeft: 4,
  },
  carImage: {
    width: "100%",
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
  },
});
