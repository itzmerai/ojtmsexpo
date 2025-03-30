import { Tabs } from "expo-router";
import React, { useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";
import Profile from "../Sidebar/Profile";

export default function TabLayout() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const openProfile = () => setIsProfileVisible(true);
  const closeProfile = () => setIsProfileVisible(false);

  return (
    <>
      <Tabs
        tabBar={(props) => (
          <TabBar {...props} isProfileVisible={isProfileVisible} />
        )}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color || "white"} />
            ),
          }}
          listeners={{
            tabPress: () => closeProfile(),
          }}
          initialParams={{ openProfile, setIsProfileVisible }} // Pass both functions
        />
        <Tabs.Screen
          name="upload"
          options={{
            title: "Upload",
            tabBarIcon: ({ color }) => (
              <AntDesign
                name="clouduploado"
                size={24}
                color={color || "white"}
              />
            ),
          }}
          listeners={{
            tabPress: () => closeProfile(),
          }}
        />
        <Tabs.Screen
          name="dtr"
          options={{
            title: "DTR",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-clock-outline"
                size={24}
                color={color || "white"}
              />
            ),
          }}
          listeners={{
            tabPress: () => closeProfile(),
          }}
        />
      </Tabs>
    </>
  );
}
