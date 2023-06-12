import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";

export default function LoginScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");

  // request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    props.setAccessToken(data);
  };

  const resetScanner = () => {
    setScanned(false);
    setScannedData("");
  };

  if (hasPermission == false) {
    alert("Camera permission denied");
  }
  return (
    <View>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo_transparent.png")}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.scannerTitle}>Scan QR code on kiosk to start</Text>
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      </View>
      <View style={styles.footerContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: { flex: 1 },
  scannerContainer: {
    height: 300,
    width: 300,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 50,
  },
});
