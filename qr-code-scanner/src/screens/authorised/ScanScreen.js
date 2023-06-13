import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-native-use-websocket";
const ENDPOINTS = require("../../../endpoints.json");
const colourScheme = require("../../../colourScheme.json");

export default function ScanScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [user, setUser] = useState();
  const [customerID, setCustomerID] = useState("");

  const [message, setMessage] = useState("");
  //

  const [socketUrl] = useState("wss://kylo.uk:8080");

  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    setMessageHistory([...messageHistory, lastMessage]);
  }, [lastMessage]);

  const sendM = () => sendMessage("Hello");

  const handleClickSendMessage = React.useCallback(sendM, [sendM]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  //

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
    }
  }, [scannedData]);

  useEffect(() => {
    pushScanner();
  }, [customerID]);

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
    )
      .then(async (res) => setUser(await res.json()))
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
              borderColor: scanned
                ? colourScheme.primary
                : colourScheme.darkGrey,
            },
          ]}
        >
          {/* <Button
            onPress={handleClickSendMessage}
            disabled={readyState !== ReadyState.OPEN}
            title={"Click Me to send 'Hello'"}
          />
          <Text>The WebSocket is currently {connectionStatus}</Text>
          {lastMessage ? <Text>Last message: {lastMessage.data}</Text> : null} */}

          {/* <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          /> */}
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
    width: "75%",
    height: 50,
  },
  organisationName: {
    fontSize: 18,
    fontWeight: "700",
    color: colourScheme.secondary,
  },
});
