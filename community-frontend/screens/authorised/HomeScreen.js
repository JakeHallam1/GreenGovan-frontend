import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { useCookies } from "react-cookie";
import { Skeleton } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

// custom modules
import {
  handleProtectedRequest,
  handleLogout,
} from "../../src/customModules/auth";
import { useState, useEffect } from "react";

// custom components
import ContentSection from "../../src/components/Home/ContentSection";
import ContentTile from "../../src/components/Home/ContentTile";

const colourScheme = require("../../../brandpack/colourScheme.json");

export default function HomeScreen(props) {
  // cookies!! :)
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  // loads user intially
  useEffect(() => props.loadUser(), []);

  const navigation = useNavigation();

  return (
    <View style={{ width: "100%" }}>
      <ScrollView style={styles.container}>
        {/* qr code section */}
        <ContentSection
          style={[styles.scanContainer]}
          header={
            <Text style={[styles.contentSectionTitle, { color: "white" }]}>
              Scan to collect GoPoints
            </Text>
          }
          body={
            <View style={styles.qrCodeContainer}>
              <View style={styles.qrCode}>
                {props.user ? (
                  <QRCode value={props.user && props.user.userID} size={200} />
                ) : (
                  <Skeleton width={200} height={200} />
                )}
              </View>

              <Text style={styles.qrCodeLabel}>
                {props.user && props.user.userID}
              </Text>
            </View>
          }
        />

        {/* user profile section */}
        <ContentSection
          style={[styles.pointsContainer]}
          body={
            <View
              style={{
                flexDirection: "row",

                justifyContent: "space-evenly",
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={styles.username}>
                  {props.user && props.user.username}
                </Text>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => handleLogout(cookies, removeCookie)}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: 700, color: "white" }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.points}>
                  {(props.user && props.user.points) || 0}
                </Text>
                <Text style={styles.pointsTitle}>GoPoints</Text>
              </View>
            </View>
          }
        />

        {/* redeem section */}
        <ContentSection
          style={[styles.contentSectionContainer]}
          header={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.contentSectionTitle, { textAlign: "left" }]}>
                Redeem
              </Text>
              <Image
                style={styles.greenLogo}
                resizeMode="contain"
                source={require("../../../brandpack/green-transparent.png")}
              />
            </View>
          }
          body={
            <ScrollView
              horizontal={true}
              style={styles.horizontalScroll}
              showsHorizontalScrollIndicator={false}
            >
              <ContentTile
                image={require("../../assets/bus-roller-small.jpeg")}
                title="Get bus tickets"
                onPress={() => navigation.navigate("Redeem")}
              />
              <ContentTile
                image={require("../../assets/eco-bus.jpeg")}
                title="Learn about Eco-travel"
              />
            </ScrollView>
          }
        />

        {/* shop section */}
        <ContentSection
          style={[styles.contentSectionContainer]}
          header={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.contentSectionTitle, { textAlign: "left" }]}>
                Shop
              </Text>
              <Image
                style={styles.greenLogo}
                resizeMode="contain"
                source={require("../../../brandpack/green-transparent.png")}
              />
            </View>
          }
          body={
            <ScrollView
              horizontal={true}
              style={styles.horizontalScroll}
              showsHorizontalScrollIndicator={false}
            >
              <ContentTile
                image={require("../../assets/co-op.jpg")}
                title="Earn GoPoints at Co-op"
              />
              <ContentTile
                image={require("../../assets/asda.jpeg")}
                title="Earn GoPoints at ASDA"
              />

              <ContentTile
                image={require("../../assets/eating-healthy.jpeg")}
                title="Eating healthy"
              />
            </ScrollView>
          }
        />

        {/* recycling section */}
        <ContentSection
          style={[styles.contentSectionContainer]}
          header={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.contentSectionTitle, { textAlign: "left" }]}>
                Recycle
              </Text>
              <Image
                style={styles.greenLogo}
                resizeMode="contain"
                source={require("../../../brandpack/green-transparent.png")}
              />
            </View>
          }
          body={
            <ScrollView
              horizontal={true}
              style={styles.horizontalScroll}
              showsHorizontalScrollIndicator={false}
            >
              <ContentTile
                image={require("../../assets/recycling-center.jpg")}
                title="Earn GoPoints recycling"
              />
              <ContentTile
                image={require("../../assets/plastic-bottles.jpeg")}
                title="Learn about recycling"
              />
            </ScrollView>
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  contentSectionTitle: {
    fontSize: 26,
    fontWeight: "700",
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
  contentSectionContainer: {},
  horizontalScroll: {
    padding: 10,
  },
  greenLogo: {
    width: 80,
    height: 35,
    marginBottom: 5,
  },
  username: {
    fontSize: 25,
    fontWeight: "800",
  },
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 30,
    height: 20,
    marginTop: 10,
    backgroundColor: colourScheme.secondary,
  },
});
