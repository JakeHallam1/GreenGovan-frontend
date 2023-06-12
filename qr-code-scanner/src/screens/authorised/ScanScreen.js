import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";

const ENDPOINTS = require("../../../endpoints.json");
const colourScheme = require("../../../colourScheme.json");

export default function ScanScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [user, setUser] = useState();

  // request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    // loadUser();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
  };

  const resetScanner = () => {
    setScanned(false);
    setScannedData("");
  };

  async function loadUser() {
    fetch(
      `${ENDPOINTS.backend.baseURL}:${ENDPOINTS.backend.ports.main}/api/users/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
      }
    )
      //   .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

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
        <Text style={styles.scannerTitle}>Scan customer QR code</Text>
        <View
          style={[
            styles.scannerContainer,
            {
              borderColor: scanned
                ? colourScheme.primary
                : colourScheme.darkGrey,
            },
          ]}
        >
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
    borderWidth: 5,
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
