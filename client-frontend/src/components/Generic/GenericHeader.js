import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GenericHeader(props) {
  return (
    <View style={styles(props).container}>
      {/* header left component and title on left */}
      <View style={styles(props).leftContainer}>
        {props.headerLeft ? (
          <View style={styles(props).left}>{props.headerLeft}</View>
        ) : null}

        {props.title ? (
          <View style={styles(props).title}>{props.title}</View>
        ) : null}
      </View>

      {/* header right component on right */}
      {props.headerRight ? (
        <View style={styles(props).right}>{props.headerRight}</View>
      ) : null}
    </View>
  );
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      height: props.height || 70,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 20,
      backgroundColor: "#ffffff",
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    left: {},
    title: {},
    right: {},
  });
