import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";

export default function CodeScreen() {
  return (
    <View>
      <QRCode value="Jake Hallam" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
