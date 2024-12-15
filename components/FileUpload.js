import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Button,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [pdfUri, setPdfUri] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        const newFile = {
          uri: result.uri,
          name: result.name,
          size: result.size,
          mimeType: result.mimeType,
          dateAdded: new Date().toLocaleString(),
        };
        setUploadedFiles([...uploadedFiles, newFile]);
      }
    } catch (error) {
      console.error("Error picking document:", error);
      alert("Error selecting document");
    }
  };

  const handleFilePress = async (file) => {
    setSelectedFile(file);
    try {
      // Generate a preview using expo-print
      const { uri } = await Print.printToFileAsync({
        html: `
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .container { max-width: 800px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 30px; }
                .details { margin: 20px 0; }
                .preview { width: 100%; height: 500px; border: none; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Document Details</h1>
                </div>
                <div class="details">
                  <h2>File Information:</h2>
                  <p><strong>Name:</strong> ${file.name}</p>
                  <p><strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(
                    2
                  )} MB</p>
                  <p><strong>Type:</strong> ${file.mimeType}</p>
                  <p><strong>Added:</strong> ${file.dateAdded}</p>
                </div>
                <div class="preview">
                  <iframe src="${file.uri}" width="100%" height="100%"></iframe>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      setPdfUri(uri);
      setShowPreview(true);
    } catch (error) {
      console.error("Error generating preview:", error);
      alert("Error generating preview");
    }
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

  if (showPreview && selectedFile) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            title="Back"
            onPress={() => {
              setShowPreview(false);
              setSelectedFile(null);
              setPdfUri(null);
            }}
          />
          <Text style={styles.headerText}>{selectedFile.name}</Text>
          <Button title="Share" onPress={handleShare} />
        </View>
        <ScrollView style={styles.previewScroll}>
          <View style={styles.previewContent}>
            <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>File Details</Text>
              <Text style={styles.detailText}>
                Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </Text>
              <Text style={styles.detailText}>
                Type: {selectedFile.mimeType}
              </Text>
              <Text style={styles.detailText}>
                Added: {selectedFile.dateAdded}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Text style={styles.uploadButtonText}>Upload PDF Document</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filesContainer}>
        <Text style={styles.sectionTitle}>Uploaded Files</Text>
        <ScrollView style={styles.filesList}>
          {uploadedFiles.map((file, index) => (
            <TouchableOpacity
              key={index}
              style={styles.fileItem}
              onPress={() => handleFilePress(file)}
            >
              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {file.name}
                </Text>
                <Text style={styles.fileDate}>{file.dateAdded}</Text>
              </View>
              <Text style={styles.fileSize}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FileUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  uploadSection: {
    padding: 20,
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  filesContainer: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  filesList: {
    flex: 1,
  },
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  fileInfo: {
    flex: 1,
    marginRight: 10,
  },
  fileName: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
  },
  fileDate: {
    fontSize: 12,
    color: "#666",
  },
  fileSize: {
    fontSize: 12,
    color: "#666",
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  previewScroll: {
    flex: 1,
  },
  previewContent: {
    padding: 20,
  },
  detailsCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
});
