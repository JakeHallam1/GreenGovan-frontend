import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function GenericModal(props) {
  return (
    <View style={styles(props).container}>
      {/* header (logo) */}
      <View style={styles(props).header}>{props.header}</View>

      {/* body (inputs) */}
      <View style={styles(props).body}>{props.body}</View>

      {/* footer (login button) */}
      <View style={styles(props).footer}>{props.footer}</View>
    </View>
  );
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      width: "25%",
      maxWidth: props.maxWidth || 500,
      minWidth: 300,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      shadowRadius: 45,
      shadowOpacity: 0.1,
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: "#ffffff",
    },
    icon: {
      position: "absolute",
      top: 15,
      right: 15,
      width: 30,
      height: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      width: "100%",
      alignItems: "center",
      // backgroundColor: "#ff000055",
      padding: 20,
    },
    body: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      // backgroundColor: "#00ff0055",
    },
    footer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      // backgroundColor: "#0000ff55",
    },
  });
