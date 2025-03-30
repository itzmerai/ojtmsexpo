import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import FileTable from "@/components/STUDENT/FileTable";
import AddReportModal from "@/components/STUDENT/AddReportModal";
import { useNavigation } from "@react-navigation/native";
import Header from "@/components/Header";
import FloatingAddButton from "@/components/FloatingAddButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "@/config";

interface Document {
  document_id: string;
  date_uploaded: string;
  remarks: string;
  uploaded_file: string;
}

export default function UploadScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reports, setReports] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const studentId = await AsyncStorage.getItem("student_id");
      if (!studentId) throw new Error("Student ID not found");

      const response = await fetch(
        `${Config.API_BASE_URL}/documents?student_id=${studentId}`
      );
      const data = await response.json();

      if (response.ok) {
        setReports(data);
      } else {
        throw new Error(data.error || "Failed to fetch documents");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReport = (remarks: string, fileUri: string | null) => {
    if (fileUri) {
      // Optimistically add to UI while refetching
      fetchDocuments();
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Upload Files"
        showBackButton={true}
        onBackPress={handleGoBack}
      />

      <View style={styles.mainContent}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Loading documents...</Text>
          </View>
        ) : (
          <FileTable data={reports} />
        )}
      </View>

      <AddReportModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddReport={handleAddReport}
      />

      <FloatingAddButton onPress={() => setModalVisible(true)} />
    </View>
  );
}

// Keep existing styles the same

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    marginTop: 20, // Adjust based on header height
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
});
