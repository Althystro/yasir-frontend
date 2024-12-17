import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllVehiclesList from "../../components/AllVehiclesList";
import VehicleDetails from "../../screens/VehicleDetails";

const Stack = createStackNavigator();

const VehicleNav = () => {
  return (
    <Stack.Navigator initialRouteName="AllVehiclesList">
      <Stack.Screen
        name="AllVehiclesList"
        component={AllVehiclesList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
        options={{ title: "Vehicle Details" }}
      />
    </Stack.Navigator>
  );
};

export default VehicleNav;
