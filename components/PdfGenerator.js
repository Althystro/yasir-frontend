import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import SignatureScreen from "react-native-signature-canvas";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const PdfGenerator = () => {
  const signatureRef = useRef();
  const [signature, setSignature] = useState(null);
  const [showSignature, setShowSignature] = useState(false);
  const [pdfUri, setPdfUri] = useState(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const handleSignature = (signature) => {
    setSignature(signature);
    setShowSignature(true);
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
    setSignature(null);
    setShowSignature(false);
    setPdfUri(null);
    setShowPdfPreview(false);
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
          <body style="margin: 0; padding: 20px;">
            <h1 style="text-align: center;">Generated Document</h1>
            <p style="text-align: center;">Signature:</p>
            <div style="text-align: center; background-color: white; padding: 20px;">
              <img src="${signature}" style="max-width: 100%; height: auto;" />
            </div>
            <p style="text-align: center;">Date: ${new Date().toLocaleDateString()}</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({
        html: html,
        base64: false,
      });

      setPdfUri(uri);
      setShowPdfPreview(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF");
    }
  };

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
            <Text style={styles.previewHeader}>Generated Document</Text>
            <Text style={styles.previewText}>Signature:</Text>
            {signature && (
              <Image
                source={{ uri: signature }}
                style={styles.previewSignature}
                resizeMode="contain"
              />
            )}
            <Text style={styles.previewText}>
              Date: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Here</Text>
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
        <Button title="Clear" onPress={handleClear} />
        <Button title="Save Signature" onPress={handleSaveSignature} />
        <Button title="Generate PDF" onPress={generatePDF} />
      </View>

      {showSignature && signature && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Signature Preview:</Text>
          <Image
            source={{ uri: signature }}
            style={styles.signaturePreview}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

export default PdfGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  signatureContainer: {
    height: 200,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "white",
  },
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
});
