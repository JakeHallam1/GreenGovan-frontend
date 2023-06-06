import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useCookies } from "react-cookie";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";

// custom modules
import { handleLogout } from "./src/customModules/auth";
// screens
import LoginScreen from "./src/screens/login/LoginScreen";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const [loggedIn, setLoggedIn] = useState(cookies.refreshToken ? true : false);

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
        <Button
          title="logout"
          onPress={() => {
            handleLogout(cookies, removeCookie);
            setLoggedIn(false);
          }}
        />
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
