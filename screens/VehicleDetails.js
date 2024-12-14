// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from "react";
// import cars from "../data/cars";
// import { FlatList } from "react-native-gesture-handler";

// const VehicleDetails = () => {

//   const[selectedCar, setSelectedCar]= useState(null)

//   const handleSelectedCar = (car)=>{
//     setSelectedCar(car);
//   }

//   return (
//     <View>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.topSection}>
//           {/* What will be added here the profile ? */}
//           <FlatList
//           data={cars}
//           keyExtractor={(item)=>item.id.toString}
//           horizontal
//           renderItem={({item})=>(
//           <TouchableOpacity
//           onPress={()=> handleSelectedCar(item) }
//           >
//             <Text>{item.name}</Text>

//           </TouchableOpacity>)}
//           />
//         </View>
//         <View style={styles.midSection}>
//           {/* Only for the logo moto */}
//           <Text style={styles.midText}> {selectedCar? selectedCar.name:"Choose a car"}</Text>
//           {/* <Text style={{ color: "white" }}>Vroom</Text> */}
//         </View>

//         {/* Containes all cards */}
//         <View style={styles.bottomSection}>
//           {/* Add the price / features / the caclulater thingy later ? maybe / button to buy */}

//           {selectedCar ?(<>
//           <Text>Starting From:</Text>
//           <Text>{selectedCar.price}</Text>
//           </>)}
        
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// export default VehicleDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     backgroundColor: "transparent",
//   },
//   topSection: {
//     flex: 0.6,
//     backgroundColor: "#ffffff",
//     // backgroundColor: "red",
//   },
//   midSection: {
//     flex: 1,
//     backgroundColor: "#1B2128",
//     // backgroundColor: "blue",
//     marginTop: -40,
//     borderTopRightRadius: 60,
//     borderTopLeftRadius: 60,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   bottomSection: {
//     flex: 3.5,
//     backgroundColor: "#ffffff",
//     // backgroundColor: "yellow",
//     borderTopRightRadius: 40,
//     borderTopLeftRadius: 40,
//     marginTop: -30,
//     // justifyContent: "center",
//     // alignItems: "center",
//     alignContent: "flex-start",
//   },
//   midText: {
//     color: "white",
//     fontSize: 35,
//     fontWeight: "bold",
//   },
// });
