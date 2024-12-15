import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AiRecomendation from "../components/AIRecomendation";
import AllVehicles from "../components/AllVehiclesList";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo/vector-icons if not already installed
import TestDrive from "../components/TestDrive";
import PdfGenerator from "../components/PdfGenerator";
import Home from "../screens/Home";
import VehicleDetails from "../screens/VehicleDetails";
import AllVehiclesList from "../components/AllVehiclesList";

const Tab = createBottomTabNavigator();

const MainNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "AI Recommendations") {
            iconName = focused ? "bulb" : "bulb-outline";
          } else if (route.name === "All Vehicles") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Test Drive") {
            iconName = focused ? "car" : "car-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={AllVehiclesList} />
      <Tab.Screen name="AI Recommendations" component={AiRecomendation} />
      <Tab.Screen name="All Vehicles" component={AllVehicles} />
      <Tab.Screen name="Test Drive" component={TestDrive} />
      <Tab.Screen name="Pdf Generator" component={PdfGenerator} />
    </Tab.Navigator>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
