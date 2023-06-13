import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ContentSection(props) {
  return (
    <View style={[styles.container, ...props.style]}>
      <View style={styles.header}>{props.header}</View>
      <View style={styles.body}>{props.body}</View>
      <View style={styles.footer}>{props.footer}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    shadowRadius: 30,
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 10,
  },
  header: {},
  body: { width: "100%" },
  footer: {},
});
