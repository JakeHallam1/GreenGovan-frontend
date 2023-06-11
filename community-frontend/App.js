import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

// navigation
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// screens
import HomeScreen from "./screens/authorised/HomeScreen";

// custom components
import GenericText from "./src/components/Generic/GenericText";
import { GenericButton } from "./src/components/Generic/GenericButton";
import Menu from "./src/components/Generic/Menu";
import GenericHeader from "./src/components/Generic/GenericHeader";

// custom modules
import { getIconName } from "./src/customModules/icons";
import LoginScreen from "./screens/login/LoginScreen";

const colourScheme = require("../brandpack/colourScheme.json");

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const [loggedIn, setLoggedIn] = useState(cookies.refreshToken ? true : false);

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      {!cookies.refreshToken && <LoginScreen />}
      {cookies.refreshToken && <HomeScreen />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2bbf71",
    alignItems: "center",
    justifyContent: "center",
  },
  header: { height: "10%", shadowRadius: 45, shadowOpacity: 0.1 },
});
