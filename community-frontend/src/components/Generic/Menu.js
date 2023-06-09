import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar } from "@rneui/themed";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

// custom modules
import { handleProtectedRequest, handleLogout } from "../../customModules/auth";

// custom components
import GenericButton from "./GenericButton";
import LineDivider from "./LineDivider";

//endpoints
const ENDPOINTS = require("../../../../endpoints.json");

// colour scheme
const colourScheme = require("../../../../brandpack/colourScheme.json");

export default function Menu(props) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  // loads profile info and stores it in cookies
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
    )
      .then((user) => {
        if (user) {
          setCookie("user", user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        {/* header section */}
        <View style={styles.header}>
          {/* profile container */}
          <View style={styles.profileContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* profile picture */}
              <Avatar
                title={props.user && props.user.firstname[0]} //trouble with this line sometimes?
                size="medium"
                containerStyle={styles.avatar}
                rounded={true}
              />

              {/* profile text container */}
              <View style={styles.profileTextContainer}>
                {/* firstname */}
                <Text style={styles.name}>
                  {props.user && props.user.firstname}
                </Text>
              </View>
            </View>

            {/* logout button */}
            <GenericButton
              text="Logout"
              rounded={true}
              onPress={() => handleLogout(cookies, removeCookie)}
              hollow={true}
              weight={600}
              size="medium"
              width={130}
            />
          </View>
        </View>
        <LineDivider span="100%" />

        {/* screen selector */}
        <DrawerContentScrollView style={{ width: "100%" }}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>

      {/* footer */}
      <View style={styles.footer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    alignItems: "center",
    width: "100%",
  },
  itemContainer: {},
  footer: {
    padding: 12,
    justifyContent: "center",
    flexDirection: "row",
  },
  avatar: { backgroundColor: "#BDBDBD" },
  profileContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileTextContainer: {
    justifyContent: "center",
    paddingHorizontal: 12,
    maxWidth: 110,
  },
  name: { fontSize: 26, fontWeight: "600", color: colourScheme.darkGrey },
  jobTitle: { color: colourScheme.lightGrey },
});
