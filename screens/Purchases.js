import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import PdfGenerator from "../components/PdfGenerator";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import Stepper from "react-native-stepper-ui";

const MyComponent = (props) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

const FinancingDuration = () => {
  return (
    <View style={[styles.componentContainer,{width:'100%'}]}>
      <Text style={[styles.mainText]}>1. Select a Financing Duration: </Text>
      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5, 6].map((year) => (
          <TouchableOpacity key={year} style={styles.durationButton}>
            <Text style={styles.durationButtonText}>
              {year} Year{year > 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* from 1 to 2 */}
      {/* <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              styles.button
            ]}
          >
            <Text style={styles.yearsText}> 1 Year</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.yearsText}> 2 Years</Text>
          </TouchableOpacity>
        </View> */}
      {/* from 3 to 4 */}

      {/* <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.yearsText}> 3 Years</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.yearsText}> 4 Years</Text>
          </TouchableOpacity>
        </View> */}

      {/* from 5 to 6 */}

      {/* <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.yearsText}> 5 Years</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.yearsText}> 6 Years</Text>
          </TouchableOpacity>
        </View> */}
    </View>
  );
};

const SetDownPayment = () => {
  const [amount, setAmount] = useState("");
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.mainText}>2. Set Your Down Payment Amount: </Text>
      <TextInput
        style={styles.amountInput}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
    </View>
  );
};

const SignatureModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.componentContainer}>
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <PdfGenerator />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </Pressable>
            </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add Signature</Text>
      </Pressable>
        
    </SafeAreaView>
  );
};

const ConfirmationMessage = ({ financingDuration, downPayment, onClose }) => {
    return (
      <View style={styles.ConfirmationMessageContainer}>
        {/* Check Icon */}
        <View style={styles.iconContainer}>
          <Icon name="checkmark-circle" size={80} color="#1B2128" />
        </View>
  
        {/* Confirmation Text */}
        <Text style={styles.title}>Purchase Confirmed!</Text>
  
        {/* Display Selected Data */}
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>
            <Text style={styles.label}>Financing Duration: </Text>
            {financingDuration} Year{financingDuration > 1 ? "s" : ""}
          </Text>
          <Text style={styles.dataText}>
            <Text style={styles.label}>Down Payment: </Text>${downPayment}
          </Text>
        </View>
  
        {/* Close Button */}
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

const content = [
  <FinancingDuration />,
  <SetDownPayment />,
  <MyComponent title="Component 3" />, //check figma / the chosen car details
  <SignatureModal />,
  <MyComponent title="Component 5" />, //Add the upload documents component here 
  <ConfirmationMessage
      financingDuration={FinancingDuration}
      downPayment={SetDownPayment}
      onClose={() => alert("Stepper Finished!")}
    />,
];

const Purchases = () => {
  const [active, setActive] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.midSection}>
        <Text style={styles.welcomeText}>Confirm Purchase</Text>
      </View>

      {/* The Stepper */}
      <View style={styles.purchasesContainer}>
        <View style={styles.stepperContainer}>
          <Stepper
            active={active}
            content={content}
            onBack={() => setActive((p) => p - 1)}
            onFinish={() => alert("Done")}
            onNext={() => setActive((p) => p + 1)}
            stepStyle={styles.stepStyle}
            stepTextStyle={styles.stepTextStyle}
            activeStepTextStyle={styles.activeStepTextStyle}
            activeStepStyle={styles.activeStepStyle}
            connectorStyle={styles.connectorStyle}
            contentStyle={styles.contentStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default Purchases;

const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop:4
  },
  midSection: {
    backgroundColor: "#1B2128",
    borderBottomRightRadius: 65,
    borderBottomLeftRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40, // Increased padding for better spacing
  },
  welcomeText: {
    color: "white",
    fontSize: 28, // Increased font size
    fontWeight: "bold",
    marginTop:25
  },
  purchasesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30, // Added top padding
  },
  stepperContainer: {
    marginBottom: 20, // Added bottom margin
  },
  componentContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop:30
  },
  mainText: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 20, // Added bottom margin
    color: '#1B2128', // Matched text color to theme
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  durationButton: {
    width: '40%',
    padding: 15,
    borderRadius: 10,
    borderColor: "#1B2128",
    borderWidth: 1,
    alignItems: "center",
    margin: 10,
    backgroundColor: '#DFE4F0', // Light background color
  },
  durationButtonText: {
    color: "#1B2128",
    fontSize: 16,
    fontWeight: "bold",
  },
  amountInput: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#1B2128",
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: 'white',
  },
  componentText: {
    fontSize: 18,
    color: '#1B2128',
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    minWidth: 150, 
    // minHeight:300
  },
  buttonOpen: {
    backgroundColor: "#DFE4F0",
  },
  buttonClose: {
    backgroundColor: "#1B2128",
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // Stepper styles
  stepStyle: {
    backgroundColor: '#DFE4F0',
    borderColor: '#1B2128',
    borderWidth: 1,
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTextStyle: {
    color: "#1B2128",
    fontWeight: "bold",
  },
  activeStepTextStyle: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  activeStepStyle: {
    backgroundColor: '#1B2128',
  },
  connectorStyle: {
    backgroundColor: "#DFE4F0",
    height: 2,
  },
  contentStyle: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 20, // Added top margin
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  ConfirmationMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B2128",
    marginBottom: 20,
  },
  dataContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  dataText: {
    fontSize: 18,
    color: "#1B2128",
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#1B2128",
  },
  button: {
    backgroundColor: "#1B2128",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
