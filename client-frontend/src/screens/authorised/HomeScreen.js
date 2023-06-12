import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCookies } from "react-cookie";
import QRCode from "react-native-qrcode-svg";
import { Skeleton } from "@rneui/themed";

// custom components
import GenericButton from "../../components/Generic/GenericButton";
import AddPointsModal from "../../components/Home/AddPointsModal";
import ConnectScannerModal from "../../components/Home/ConnectScannerModal";

// custom modules
import { handleLogout, handleProtectedRequest } from "../../customModules/auth";

const colourScheme = require("../../../../brandpack/colourScheme.json");

const ENDPOINTS = require("../../../../endpoints.json");

export default function HomeScreen() {
  // cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const [user, setUser] = useState(null);

  useEffect(() => {
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
    ).then((user) => {
      setUser(user);
    });
  }, []);

  //states
  const [addPointsVisible, setAddPointsVisible] = useState(false);
  const [connectScannerVisible, setConnectScannerVisible] = useState(false);

  return (
    <View style={styles.container}>
      <AddPointsModal
        visible={addPointsVisible}
        setVisible={setAddPointsVisible}
      />
      <ConnectScannerModal
        visible={connectScannerVisible}
        setVisible={setConnectScannerVisible}
      />
      <View style={styles.topContainer}>
        {/* Logout Button */}
        <View style={styles.button}>
          <GenericButton
            text="Logout"
            rounded={true}
            colour={colourScheme.primary}
            hollow={true}
            fontWeight={600}
            width={100}
            onPress={() => handleLogout(cookies, removeCookie)}
          />
        </View>
      </View>
      <View style={styles.dashboard}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <GenericButton
              text="Add points"
              rounded={true}
              colour={colourScheme.primary}
              fontWeight={600}
              width={130}
              padding={10}
              onPress={() => setAddPointsVisible(true)}
            />
            <GenericButton
              text="Connect scanner"
              rounded={true}
              colour={colourScheme.primary}
              fontWeight={600}
              width={130}
              padding={10}
              onPress={() => setConnectScannerVisible(true)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    overflow: "hidden",
  },
  topContainer: {
    width: "100%",
    alignItems: "flex-start",
    padding: 10,
    paddingLeft: 5,
  },
  dashboard: {},
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 10,
  },
});
