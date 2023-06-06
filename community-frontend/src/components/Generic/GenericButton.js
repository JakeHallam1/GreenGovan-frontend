import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import GenericText from "./GenericText";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import { invertColor, colourLuminance } from "../../customModules/colour";

const colourScheme = require("../../../brandpack/colourScheme.json");

export default function GenericButton(props) {
  const textColour = props.textColour
    ? props.textColour
    : props.hollow
    ? props.disabled
      ? colourScheme.lightGrey
      : props.colour || colourScheme.primary
    : props.disabled
    ? "#ffffff"
    : invertColor(props.colour || colourScheme.primary, true);
  return (
    <TouchableOpacity
      activeOpacity={props.latched ? 1 : 0.2}
      style={[
        styles(props).container,
        {
          // colouring logic
          backgroundColor: props.hollow
            ? "transparent"
            : props.disabled
            ? colourScheme.lightGrey
            : props.active
            ? colourLuminance(props.colour || colourScheme.primary, -0.4)
            : props.colour || colourScheme.primary,
        },
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : props.component ? (
        props.component
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {props.icon ? (
            <Ionicons
              name={props.icon}
              size={props.size ? (props.size == "medium" ? 20 : 22) : 22}
              color={textColour}
              style={{ marginRight: 5 }}
            />
          ) : null}
          <GenericText
            // colouring logic
            colour={textColour}
            weight={props.weight}
            size={props.size ? (props.size == "medium" ? 15 : 16) : 16}
            wrap="nowrap"
          >
            {props.text || "Button"}
          </GenericText>
        </View>
      )}
    </TouchableOpacity>
  );
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      width: props.width,
      minWidth: props.size ? (props.size == "medium" ? 66 : 100) : 100,
      height:
        props.height || (props.size ? (props.size == "medium" ? 20 : 30) : 30),
      alignItems: "center",
      justifyContent: "center",
      borderColor:
        (props.disabled ? colourScheme.lightGrey : props.colour) ||
        colourScheme.primary,
      borderWidth: props.hollow ? 2.5 : 0,
      borderRadius: props.rounded ? 100 : 0,
      paddingVertical: 20,
      paddingHorizontal:
        props.padding || (props.size ? (props.size == "medium" ? 50 : 60) : 60),
      shadowRadius: props.shadow ? 45 : 0,
      shadowOpacity: props.shadow ? 0.2 : 0,
      textAlign: "center",
    },
  });
