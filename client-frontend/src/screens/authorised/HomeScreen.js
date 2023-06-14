import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
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
import GenericText from "../../components/Generic/GenericText";

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
        <View style={styles.username}>
          <GenericText size={22} weight={700}>
            {user && user.organisationName}
          </GenericText>
        </View>
        {/* Logout Button */}
        <View style={styles.button}>
          <GenericButton
            text="Logout"
            rounded={true}
            colour={colourScheme.primary}
            hollow={true}
            fontWeight={600}
            width={100}
            padding={10}
            onPress={() => handleLogout(cookies, removeCookie)}
          />
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo_transparent.png")}
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.dashboard}>
        <View style={styles.buttonContainer}>
          {/* Connect Scanner Button */}
          <View style={styles.button}>
            <GenericButton
              text="Connect scanner"
              rounded={true}
              colour={colourScheme.primary}
              fontWeight={600}
              width={150}
              padding={5}
              onPress={() => setConnectScannerVisible(true)}
            />
          </View>
          {/* Add Points Button */}
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
    padding: 10,
    paddingLeft: 5,
    flexDirection: "row",
  },
  dashboard: {
    height: "100%",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  logoContainer: {
    width: 150,
    position: "absolute",
    right: 0,
    marginRight: 10,
  },
  logo: {
    width: "100%",
    height: 50,
    padding: 10,
    resizeMode: "contain",
  },
  username: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
