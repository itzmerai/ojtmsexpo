import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

interface Document {
  document_id: string;
  date_uploaded: string;
  remarks: string;
  uploaded_file: string;
}

interface FileTableProps {
  data: Document[];
}

const FileTable: React.FC<FileTableProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Upload History</Text>

      {data.map((document) => (
        <View key={document.document_id} style={styles.reportContainer}>
          <Image
            source={{ uri: document.uploaded_file }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.dateText}>
              {formatDate(document.date_uploaded)}
            </Text>
            <Text style={styles.remarksText}>{document.remarks}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Matching theme color
    textAlign: "left",
    marginBottom: 0,
    bottom: 15,
  },
  reportContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  remarksText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

export default FileTable;
