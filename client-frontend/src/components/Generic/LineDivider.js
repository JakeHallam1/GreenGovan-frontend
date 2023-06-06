import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function LineDivider(props) {
  return (
    <View
      style={{
        width: props.vertical ? 1.5 : props.span || "66%",
        height: props.vertical ? props.span || "66%" : 1.5,
        marginHorizontal: props.margin && props.vertical ? props.margin : 0,
        marginVertical: props.margin && !props.vertical ? props.margin : 0,
        backgroundColor: "#00000022",
        borderRadius: 10,
      }}
    />
  );
}

const styles = StyleSheet.create({});
