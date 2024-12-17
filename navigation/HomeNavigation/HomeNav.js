import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/Home";
import AllVehicles from "../../components/AllVehiclesList";
import TestDrive from "../../components/TestDrive";
import AIRecomendation from "../../components/AIRecomendation";
import VehicleDetails from "../../screens/VehicleDetails";
import PdfGenerator from "../../components/PdfGenerator";
import Payment from "../../screens/Payment";

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={
        {
          // headerShown: false,
        }
      }
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="All Vehicles" component={AllVehicles} />
      <Stack.Screen name="Test Drive" component={TestDrive} />
      <Stack.Screen name="Ai Recommendations" component={AIRecomendation} />
      <Stack.Screen name="Vehicle Details" component={VehicleDetails} />
      <Stack.Screen name="Pdf Generator" component={PdfGenerator} />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};

export default HomeNav;

const styles = StyleSheet.create({});
