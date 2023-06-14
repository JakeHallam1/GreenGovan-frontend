import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-native-use-websocket";
import { FontAwesome } from "@expo/vector-icons";

const ENDPOINTS = require("../../../endpoints.json");
const colourScheme = require("../../../colourScheme.json");

export default function ScanScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [user, setUser] = useState();
  const [customerID, setCustomerID] = useState("");
  const [tickVisible, setTickVisible] = useState(false);

  // request camera permissions
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    loadUser();
  }, []);

  useEffect(() => {
    if (scannedData != customerID) {
      setCustomerID(scannedData);
      setTickVisible(true);
      setTimeout(() => {
        setTickVisible(false);
      }, 1000);
    }
  }, [scannedData]);

  useEffect(() => {
    pushScanner();
  }, [customerID]);

  const handleBarCodeScanned = ({ type, data }) => {
    if (data != scannedData) {
      setScanned(true);
      setScannedData(data);
    }
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
      .then(async (res) => setUser(await res.json()))
      .catch((error) => console.log(error));
  }

  async function pushScanner() {
    fetch(
      `${ENDPOINTS.backend.baseURL}:${ENDPOINTS.backend.ports.main}/api/scanner/data`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify({
          data: customerID,
        }),
      }
    ).catch((error) => console.log(error));
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
        <Text style={styles.organisationName}>
          {user && user.organisationName}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.scannerTitle}>Scan customer QR code</Text>
        <View
          style={[
            styles.scannerContainer,
            {
              borderColor: tickVisible
                ? colourScheme.primary
                : colourScheme.darkGrey,
            },
          ]}
        >
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {tickVisible && (
            <View
              style={{
                width: 75,
                height: 75,
                backgroundColor: colourScheme.primary,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="check" size={40} color="white" />
            </View>
          )}
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text>{customerID}</Text>
      </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    padding: 20,
  },
  logo: {
    width: "75%",
    height: 50,
  },
  organisationName: {
    fontSize: 18,
    fontWeight: "700",
    color: colourScheme.secondary,
  },
});
