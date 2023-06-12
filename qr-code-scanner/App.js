import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  SafeAreaView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

// screens
import LoginScreen from "./src/screens/login/LoginScreen";
import ScanScreen from "./src/screens/authorised/ScanScreen";

//const colourScheme = require("../../GreenGovan-frontend/brandpack/colourScheme.json");

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [accessToken, setAccessToken] = useState();

  // request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
  };

  const resetScanner = () => {
    setScanned(false);
    setScannedData("");
  };

  if (hasPermission == false) {
    alert("Camera permission denied");
  }

  return (
    <SafeAreaView style={styles.container}>
      {accessToken ? (
        <ScanScreen accessToken={accessToken} />
      ) : (
        <LoginScreen setAccessToken={setAccessToken} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  scanner: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green", //to be colourscheme.primary
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textOutput: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    marginTop: 20,
  },
});
