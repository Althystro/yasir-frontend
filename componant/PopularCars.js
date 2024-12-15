// import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// import React from "react";
// // import { useState } from "react";
// import Carousel from "react-native-snap-carousel";

// import cars from "../data/cars";
// import { Dimensions } from "react-native";


// const PopularCars = () => {
//   //   const [isHovered, setIsHovered] = useState(false);
//   console.log("Cars data: ",cars);


//   const renderCars = ({ item }) => (

//     <View style={styles.container}>
//       <Image
//         source={{
//           uri: item.image || "https://via.placeholder.com/150",
//         }}
//         style={styles.image}
//       />
//       {/* 
//       {isHovered && (
//         <View style={styles.overlay}>
//           <Text style={styles.buttonText}> Discover The Car</Text>
//         </View>
//       )} */}
//       {/* </TouchableOpacity> */}
//       <Text style={styles.carName}> {item.name}</Text>
//       <Text style={styles.carDetails}>{item.details}</Text>
//     </View>
//   );

//   console.log("Rendering car:", item); 

 

//   return (
//     <View style={styles.outerContainer}>
//       <Text style={styles.headerText}> Popular Cars:</Text>

//       <Carousel
//         data={cars}
//         renderItem={renderCars}
//         sliderWidth={width} // Width of the carousel container
//         itemWidth={width * 0.7} // Width of each card
//         keyExtractor={(item) => item.id.toString()}

//       />
//     </View>
//   );
// };

// export default PopularCars;

// const styles = StyleSheet.create({
//   outerContainer: {
//     justifyContent: "center",
//     alignContent: "center",
//     paddingTop: 20,
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 40,
//   },
//   //   cardContainer: {
//   //     justifyContent: "center",
//   //     alignContent: "center",
//   //   },
//   container: {
//     position: "relative",
//     justifyContent: "center",
//     alignContent: "center",
//     width: 250,
//     height: 300,
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#f7f0f0",
//   },
//   image: {
//     width: "100%",
//     height: "70%",
//     // borderRadius:10
//   },
//   carName: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   carDetails: {
//     fontSize: 14,
//     textAlign: "center",
//   },
// });

import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import React from "react";
import cars from "../data/cars";

const PopularCars = () => {
  const { width } = Dimensions.get("window");

  const renderCars = ({ item }) => (
    <View style={styles.container}>
      <Image
        source={{
          uri: item.image || "https://via.placeholder.com/150",
        }}
        style={styles.image}
      />
      <Text style={styles.carName}> {item.name}</Text>
      <Text style={styles.carDetails}>{item.details}</Text>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.headerText}>Popular Cars:</Text>
      <FlatList
        data={cars}
        renderItem={renderCars}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

export default PopularCars;

const styles = StyleSheet.create({
  outerContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 20,
  },
  headerText: {
    marginLeft:15,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f7f0f0",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "70%",
  },
  carName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  carDetails: {
    fontSize: 14,
    textAlign: "center",
  },
});
