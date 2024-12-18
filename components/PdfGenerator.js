import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SignatureScreen from "react-native-signature-canvas";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import FileUpload from "./FileUpload";
import WebView from "react-native-webview";

const PdfGenerator = ({ vehicle, customer, downpayment, length, financer }) => {
  const signatureRef = useRef();
  const [signature, setSignature] = useState(null);
  const [showSignature, setShowSignature] = useState(false);
  const [pdfUri, setPdfUri] = useState(null);
  // const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const [showPdfPreview, setShowPdfPreview] = useState(false);
  console.log(financer);

  const financerName = financer.name;
  console.log(financer);
  console.log(financerName);

  if (!vehicle) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Vehicle data not available</Text>
      </View>
    );
  }

  const handleSignature = (signature) => {
    setSignature(signature);
    setShowSignature(true);
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
    setSignature(null);
    setShowSignature(false);
    setPdfUri(null);
    // setShowPdfPreview(false);
  };

  const handleSaveSignature = () => {
    signatureRef.current.readSignature();
  };

  const handleShare = async () => {
    if (pdfUri) {
      try {
        await Sharing.shareAsync(pdfUri);
      } catch (error) {
        console.error("Error sharing PDF:", error);
        alert("Failed to share PDF");
      }
    }
  };

  const generatePDF = async () => {
    if (!signature) {
      alert("Please sign before generating PDF");
      return;
    }

    try {
      const html = `
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; }
              .container { padding: 20px; max-width: 800px; margin: 0 auto; }
              .signature-container { text-align: center; margin: 20px 0; }
              .signature-image { max-width: 100%; height: auto; border: 1px solid #ccc; }
              .details { margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 style="text-align: center;">Vehicle Purchase Document</h1>
              <div class="details">
                <p><strong>Paymen Plan Details:</strong></p>
                <ul>
                  <li>Customer Name: ${customer.firstName} ${
        customer.lastName
      }</li>
                  <li>Vehicle: ${vehicle.year} ${vehicle.brand} ${
        vehicle.model
      }</li>
                  <li>Financer: ${financerName}</li>
                  <li>Length of contract: ${length} Years (${
        length * 12
      } Months)</li>
      <li>Total price: ${vehicle.price}</li>
                  <li>Downpayment: $${downpayment}</li>
                  <li>Total after Downpayment: ${
                    vehicle.price - downpayment
                  }</li>
                </ul>
                <p><strong>Vehicle Details:</strong></p>
                <ul>
                  <li>Brand: ${vehicle.brand}</li>
                  <li>Model: ${vehicle.model}</li>
                  <li>Year: ${vehicle.year}</li>
                </ul>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              <div class="signature-container">
                <p><strong>Signature:</strong></p>
                <img src="${signature}" class="signature-image" />
              </div>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: html,
        base64: false,
      });

      setPdfUri(uri);
      // setShowPdfPreview(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF");
    }
  };

  useEffect(() => {
    if (showPdfModal) {
      generatePDF();
    }
  }, [showPdfModal]);

  const style = `
    .m-signature-pad--footer {display: none}
    .m-signature-pad--body {border: none;}
    .m-signature-pad {box-shadow: none; border: none;}
    body,html {
      height: 100%;
      width: 100%;
      margin: 0px;
      padding: 0px;
    }
    .m-signature-pad--body canvas {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  `;


  if (showPdfPreview && pdfUri) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button title="Back" onPress={() => setShowPdfPreview(false)} />
          <Button title="Share PDF" onPress={handleShare} />
        </View>
        <ScrollView style={styles.previewScroll}>
          <View style={styles.previewContent}>
            <Text style={styles.previewHeader}>Vehicle Purchase Document</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.previewText}>Payment Plan Details:</Text>
              <Text style={styles.detailText}>
                Customer Name: {customer.firstName} {customer.lastName}
              </Text>
              <Text style={styles.detailText}>
                Vehicle: {vehicle.year} {vehicle.brand} {vehicle.model}
              </Text>
              <Text style={styles.detailText}>Financer: {financerName}</Text>
              <Text style={styles.detailText}>
                Length: {length} Years ({length * 12} Months)
              </Text>
              <Text style={styles.detailText}>
                Total price: {vehicle.price}
              </Text>
              <Text style={styles.detailText}>
                Downpayment: KD {downpayment}
              </Text>
              <Text style={styles.detailText}>
                Total after Downpayment: ${vehicle.price - downpayment}
              </Text>
              <Text></Text>
              <Text style={styles.previewText}>Vehicle Details:</Text>
              <Text style={styles.detailText}>Brand: {vehicle.brand}</Text>
              <Text style={styles.detailText}>Model: {vehicle.model}</Text>
              <Text style={styles.detailText}>Year: {vehicle.year}</Text>
              <Text style={styles.previewText}>
                Date: {new Date().toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.previewText}>Signature:</Text>
            {signature && (
              <Image
                source={{ uri: signature }}
                style={styles.previewSignature}
                resizeMode="contain"
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <FileUpload /> */}
      {/* <Text style={styles.title}>Sign Here</Text> */}
      <View style={styles.signatureContainer}>
        <SignatureScreen
          ref={signatureRef}
          onOK={handleSignature}
          webStyle={style}
          backgroundColor="rgb(255,255,255)"
          penColor="rgb(0,0,0)"
          imageType="image/png"
          trimWhitespace={false}
          descriptionText=""
          minWidth={3}
          maxWidth={3}
          androidHardwareAccelerationDisabled={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSaveSignature}>
          <Text style={styles.buttonText}>Save Signature</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowPdfModal(true)}
        >
          <Text style={styles.buttonText}>Generate PDF</Text>
        </TouchableOpacity>
        {/* <Button title="Clear" onPress={handleClear} /> */}
        {/* <Button title="Save Signature" onPress={handleSaveSignature} /> */}
        {/* <Button title="Generate PDF" onPress={generatePDF} /> */}
      </View>

      <Modal
        visible={showPdfModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowPdfModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowPdfModal(false)}>
              <Text style={styles.closeButton}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}>
              <Text style={styles.shareButton}>Share</Text>
            </TouchableOpacity>
          </View>
          {/* {pdfUri ? (
            <WebView
              source={{ uri: pdfUri }}
              style={styles.webview}
              javaScriptEnabled
            />
          ) : (
            <Text style={styles.loadingText}>Loading PDF...</Text>
          )} */}
          {pdfUri ? (
            <Image
              source={{ uri: pdfUri }}
              style={styles.pdfPreview}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.loadingText}>Generating PDF...</Text>
          )}
        </SafeAreaView>
      </Modal>
      {/* 
      {showSignature && signature && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Signature Preview:</Text>
          <Image
            source={{ uri: signature }}
            style={styles.signaturePreview}
            resizeMode="contain"
          />
        </View>
      )} */}
    </SafeAreaView>
  );
};

export default PdfGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 10,
    backgroundColor: "white",
    //maxHeight: "300",
    //width: "80%",
    //marginTop: 100,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  // signatureContainer: {
  //   height: 200,
  //   marginBottom: 20,
  //   borderWidth: 1,
  //   borderColor: "#000000",
  //   backgroundColor: "white",
  // },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  previewContainer: {
    alignItems: "center",
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  signaturePreview: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    backgroundColor: "white",
  },
  previewScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  previewContent: {
    padding: 20,
    alignItems: "center",
  },
  previewHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  previewText: {
    fontSize: 16,
    marginVertical: 10,
  },
  previewSignature: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    marginVertical: 20,
    backgroundColor: "white",
  },
  detailsContainer: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  detailText: {
    fontSize: 14,
    marginVertical: 2,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
  signatureContainer: {
    height: 155,
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "#ffffff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 3,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    height: "80%",
    width: "90%",
    alignSelf: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  closeButton: { color: "gray", fontSize: 16 },
  shareButton: { color: "gray", fontSize: 16 },
  pdfPreview: {
    flex: 1,
    margin: 10,
  },
  loadingText: { textAlign: "center", marginTop: 50, fontSize: 18 },
});
