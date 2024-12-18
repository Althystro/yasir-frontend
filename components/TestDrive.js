import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Stepper from "react-native-stepper-ui";
import SelectDateAndTime from "./SelectDateAndTime";
import Confirmation from "./Confirmation";
import StaticHeader from "./StaticImageHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const TestDrive = ({ route }) => {
  const { vehicle } = route.params;
  const [active, setActive] = useState(0);
  const scrollY = new Animated.Value(0);
  const navigation = useNavigation();

  const content = [
    <SelectDateAndTime vehicle={vehicle} />,
    <Confirmation vehicle={vehicle} />,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StaticHeader
        scrollY={scrollY}
        title="Book a Test Drive"
        subtitle={`${vehicle.brand} ${vehicle.model}`}
        backgroundColor="#1B2128"
        textColor="white"
        headerImage={vehicle.image}
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
                onPress={() => navigation.navigate("Profile")}
              >
                <Text style={[styles.buttonText, styles.nextButtonText]}>
                  Complete Booking
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
});

export default TestDrive;
