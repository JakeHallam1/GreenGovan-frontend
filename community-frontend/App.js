import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GenericButton } from "./src/components/Generic/GenericButton";

const colourScheme = require("./brandpack/colourScheme.json");

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Green Govan</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2bbf71",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 80,
    fontWeight: "900",
    color: "#ffffff",
  },
});
