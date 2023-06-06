import { StyleSheet, Text, View } from "react-native";
import React from "react";

const colourScheme = require("../../../../brandpack/colourScheme.json");

export default function GenericText(props) {
  return (
    <Text style={props.style || styles(props).text}>{props.children}</Text>
  );
}

const styles = (props) =>
  StyleSheet.create({
    text: {
      color: props.colour || colourScheme.text,
      fontWeight: props.weight || "normal",
      fontSize: props.size || 11,
      flexWrap: props.wrap || "wrap",
    },
  });
