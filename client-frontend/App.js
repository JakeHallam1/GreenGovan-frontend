import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useCookies } from "react-cookie";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";

// screens
import LoginScreen from "./src/screens/login/LoginScreen";
import HomeScreen from "./src/screens/authorised/HomeScreen";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(
    "accessToken",
    "refreshToken"
  );

  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer
      style={styles.container}
      documentTitle={{
        formatter: (options, route) =>
          `${options?.title ?? route?.name ?? "Login"} - GreenGovan`,
      }}
    >
      {/* public login screen */}
      {!cookies.refreshToken && <LoginScreen setLoggedIn={setLoggedIn} />}

      {cookies.refreshToken && <HomeScreen />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
