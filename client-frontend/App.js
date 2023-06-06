import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useCookies } from "react-cookie";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";

// screens
import LoginScreen from "./src/screens/login/LoginScreen";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(
    "accessToken",
    "refreshToken"
  );

  const [loggedIn, setLoggedIn] = useState(false);
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

      {cookies.refreshToken && (
        <Text>You are logged in with token {cookies.accessToken}</Text>
      )}
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
