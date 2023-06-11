import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

export default function PartnersSection() {
  return (
    <View>
      <ImageBackground
        style={styles.container}
        source="../../../assets/barcodebus.jpg"
      >
        <Text>Test</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
  },
});
