import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { useCookies } from "react-cookie";
import { Skeleton } from "@rneui/themed";

// custom modules
import {
  handleProtectedRequest,
  handleLogout,
} from "../../src/customModules/auth";
import { Button } from "@rneui/base";
import { useState, useEffect } from "react";

// custom components
import ContentSection from "../../src/components/Home/ContentSection";
import PartnersSection from "../../src/components/Home/partnersSection";

const ENDPOINTS = require("../../../endpoints.json");
const colourScheme = require("../../../brandpack/colourScheme.json");

export default function HomeScreen() {
  // cookies!! :)
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (userLoading) {
      loadUser();
    }
  }, [userLoading]);

  async function loadUser() {
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
    )
      .then((response) => {
        return response.json();
      })
      .then((user) => setUser(user))
      .finally(() => setUserLoading(false))
      .catch((error) => console.warn(error)); //show error on screen
  }
  return (
    <ScrollView style={styles.container}>
      <ContentSection
        style={[styles.scanContainer]}
        header={
          <Text style={[styles.contentSectionTitle, { color: "white" }]}>
            Scan to collect points
          </Text>
        }
        body={
          <View style={styles.qrCodeContainer}>
            <View style={styles.qrCode}>
              {user ? (
                <QRCode value={user && user.userID} size={200} />
              ) : (
                <Skeleton width={200} height={200} />
              )}
            </View>

            <Text style={styles.qrCodeLabel}>{user && user.userID}</Text>
          </View>
        }
      />
      <ContentSection
        style={[styles.pointsContainer]}
        body={
          <View>
            <Text style={styles.points}>{(user && user.points) || 0}</Text>
            <Text style={styles.pointsTitle}>Go Points</Text>
          </View>
        }
      />

      <ContentSection
        style={[styles.redeemContainer]}
        header={
          <Text style={[styles.contentSectionTitle, { textAlign: "left" }]}>
            Redeem
          </Text>
        }
        body={
          <ScrollView horizontal={true}>
            <PartnersSection />
          </ScrollView>
        }
      />

      <Button
        title="Logout"
        onPress={() => handleLogout(cookies, removeCookie)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  contentSectionTitle: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    padding: 5,
  },
  scanContainer: {
    justifyContent: "center",
    backgroundColor: colourScheme.primary,
  },
  qrCodeContainer: {
    alignItems: "center",
    margin: 10,
  },
  qrCode: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },

  qrCodeLabel: {
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  pointsContainer: {
    alignItems: "center",
  },
  points: {
    fontSize: 50,
    fontWeight: "800",
    color: colourScheme.primary,
  },
  pointsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colourScheme.primary,
  },
  redeemContainer: {},
});
