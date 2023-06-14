import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

// navigation
import { NavigationContainer } from "@react-navigation/native";

// screens
import HomeScreen from "./screens/authorised/HomeScreen";
import RedeemScreen from "./screens/authorised/RedeemScreen";
import LoginScreen from "./screens/login/LoginScreen";

// custom modules
import { handleProtectedRequest } from "./src/customModules/auth";

const colourScheme = require("../brandpack/colourScheme.json");
const ENDPOINTS = require("../endpoints.json");

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (userLoading) {
      loadUser();
    }
  }, [userLoading]);

  function loadUser() {
    handleProtectedRequest(
      `${ENDPOINTS.backend.baseURL}:${ENDPOINTS.backend.ports.main}/api/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      cookies,
      setCookie,
      removeCookie
    )
      .then((response) => {
        return response.json();
      })
      .then((user) => setUser(user))
      .finally(() => setUserLoading(false))
      .catch((error) => console.warn(error)); //show error on screen
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      documentTitle={{
        formatter: (options, route) => `${route?.name ?? "Login"} - GreenGovan`,
      }}
    >
      {!cookies.refreshToken && <LoginScreen />}
      {cookies.refreshToken && (
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            title: (
              <Image
                style={{ width: 175, height: 50 }}
                source={require("./assets/logo_transparent.png")}
                resizeMode="contain"
              />
            ),
          }}
        >
          <Stack.Screen name="Home">
            {() => <HomeScreen user={user} loadUser={loadUser} />}
          </Stack.Screen>
          <Stack.Screen name="Redeem">
            {() => <RedeemScreen user={user} loadUser={loadUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
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
