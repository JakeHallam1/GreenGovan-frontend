import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { FlatGrid } from "react-native-super-grid";
import ContentSection from "../../src/components/Home/ContentSection";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// custom modules
import { handleProtectedRequest } from "../../src/customModules/auth";

// custom components
import RedeemModal from "../../src/components/Redeem/RedeemModal";

const colourScheme = require("../../../brandpack/colourScheme.json");
const ENDPOINTS = require("../../../endpoints.json");

const options = [
  { name: "Single", price: 50, colour: colourScheme.primary },
  { name: "Return", price: 100, colour: "#a97142" },
  { name: "Day Rider", price: 150, colour: "#b7c1cd" },
  { name: "Week Rider", price: 500, colour: "#d4af37" },
];
export default function RedeemScreen(props) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [redeemModalVisible, setRedeemModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      setRedeemModalVisible(true);
    }
  }, [selectedItem]);

  // handles redeeming points
  async function handleRedeem() {
    console.log("Handling redeem");
    handleProtectedRequest(
      `${ENDPOINTS.backend.baseURL}:${ENDPOINTS.backend.ports.main}/api/points/redeem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          points: selectedItem.price,
        }),
      },
      cookies,
      setCookie,
      removeCookie
    )
      .then((data) => console.log(data))
      .then(() => props.loadUser())
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.container}>
      {/* redeem modal */}
      <RedeemModal
        visible={redeemModalVisible}
        setVisible={setRedeemModalVisible}
        onSubmit={handleRedeem}
        onClose={() => setSelectedItem(null)}
        item={
          selectedItem && (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={[
                  styles.gridItem,
                  {
                    backgroundColor: selectedItem.colour,
                    width: 200,
                    height: 200,
                  },
                ]}
              >
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={styles.itemPrice}>{selectedItem.price}</Text>
                  <Text style={styles.itemPointsCaption}>GoPoints</Text>
                </View>
                <Text style={styles.itemName}>{selectedItem.name}</Text>
              </View>
            </View>
          )
        }
      />
      {/* bus ticket options */}
      <FlatGrid
        data={options}
        itemDimension={130}
        // spacing={20}
        ListHeaderComponent={
          <ContentSection
            style={[styles.pointsContainer]}
            body={
              <View
                style={{
                  flexDirection: "row",

                  justifyContent: "space-evenly",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.points}>
                    {(props.user && props.user.points) || 0}
                  </Text>
                  <Text style={styles.pointsTitle}>GoPoints</Text>
                </View>
              </View>
            }
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.gridItem, { backgroundColor: item.colour }]}
            onPress={() => setSelectedItem(item)}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text style={styles.itemPointsCaption}>GoPoints</Text>
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
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
  gridItem: {
    height: 175,
    shadowRadius: 15,
    shadowOpacity: 0.05,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  itemPrice: {
    fontSize: 40,
    color: "white",
    fontWeight: "700",
  },
  itemName: {
    fontSize: 30,
    fontWeight: "700",
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
  username: {
    fontSize: 25,
    fontWeight: "800",
  },
  itemPointsCaption: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
});
