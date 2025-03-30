import React, { useState } from "react";
import { View, TextInput, StyleSheet, ScrollView, Text } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import Header from "@/components/Header";

// Define the type for the timesheet entry
type TimesheetEntry = {
  date: string;
  morning: { in: string; out: string };
  afternoon: { in: string; out: string };
  totalHours: number;
};

// Define the type for the route parameters
type RootStackParamList = {
  SearchScreen: { timesheet: TimesheetEntry[] };
};

// Use the correct route type
type SearchScreenRouteProp = RouteProp<RootStackParamList, "SearchScreen">;

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<SearchScreenRouteProp>();
  const { timesheet = [] } = route.params || {}; // Ensure timesheet always has a default value
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<TimesheetEntry[]>(timesheet);
  console.log("Received timesheet in SearchScreen:", timesheet);
  console.log("Timesheet Length:", timesheet.length);

  const handleSearch = (query: string) => {
    console.log("Search Query:", query);

    setSearchQuery(query);

    if (!query.trim()) {
      console.log("Resetting to full list");
      setFilteredData(timesheet); // Reset to full list when query is empty
      return;
    }

    const lowerCaseQuery = query.toLowerCase();

    const filtered = timesheet.filter((item) => {
      const match =
        item.date.includes(lowerCaseQuery) ||
        item.morning.in.toLowerCase().includes(lowerCaseQuery) ||
        item.morning.out.toLowerCase().includes(lowerCaseQuery) ||
        item.afternoon.in.toLowerCase().includes(lowerCaseQuery) ||
        item.afternoon.out.toLowerCase().includes(lowerCaseQuery);

      if (match) {
        console.log("Matched item:", item);
      }

      return match;
    });

    console.log("Filtered Data:", filtered);
    setFilteredData(filtered);
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        title="Search"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.searchContainer}>
        <TextInput
          autoFocus
          style={styles.searchInput}
          placeholder="Search Records ..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        {filteredData.length === 0 ? (
          <Text style={styles.noResultsText}>No records found</Text>
        ) : (
          filteredData.map((row, index) => {
            console.log("Rendering row:", row);
            return (
              <View key={index} style={styles.rowContainer}>
                <Text style={styles.cellText}>Date: {row.date}</Text>
                <Text style={styles.cellText}>
                  Morning In: {row.morning.in}
                </Text>
                <Text style={styles.cellText}>
                  Morning Out: {row.morning.out}
                </Text>
                <Text style={styles.cellText}>
                  Afternoon In: {row.afternoon.in}
                </Text>
                <Text style={styles.cellText}>
                  Afternoon Out: {row.afternoon.out}
                </Text>
                <Text style={styles.cellText}>
                  Total Hours: {row.totalHours} hrs
                </Text>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  noResultsText: {
    left: 20,
    top: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: "center",
    marginHorizontal: 15,
  },
  searchInput: {
    fontSize: 16,
  },
  rowContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  cellText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default SearchScreen;
