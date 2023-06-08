import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import React from "react";
import GenericButton from "../../components/Generic/GenericButton";

const colourScheme = require("../../../../brandpack/colourScheme.json");

export default function HomeScreen() {
  const userIDRef = React.createRef();
  const numValRef = React.createRef();

  const [userID, setUserID] = useState("");
  const [numVal, setNumVal] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.button}>
          <GenericButton
            text="Logout"
            rounded={true}
            colour={colourScheme.primary}
            hollow={true}
            fontWeight={600}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={userIDRef}
          style={[styles.textInput, { outline: "none" }]}
          placeholder={"User ID"}
          placeholderTextColor={colourScheme.lightGrey}
          value={userID}
          onChangeText={(text) => setUserID(text)}
          onSubmitEditing={() => numValRef.current.focus()}
        />
        <TextInput
          ref={numValRef}
          style={[styles.numInput, { outline: "none" }]}
          value={numVal}
          onChangeText={(text) => {
            if (!isNaN(Number(text.replace("/[^0-9]/g", "")))) {
              setNumVal(Number(text.replace("/[^0-9]/g", "")));
            }
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <GenericButton
            text="Add"
            rounded={true}
            colour={colourScheme.primary}
            fontWeight={600}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topContainer: {
    width: "100%",
    alignItems: "flex-start",
    padding: 10,
    paddingLeft: 5,
  },
  textInput: {
    fontSize: 20,
    fontWeight: "600",
    color: colourScheme.text,
    width: "200%",
    borderRadius: 5,
    backgroundColor: colourScheme.haze,
    padding: 10,
    marginBottom: 50,
  },
  inputContainer: {
    alignItems: "center",
    alignContent: "top",
    marginTop: 50,
  },
  numInput: {
    fontSize: 20,
    fontWeight: "600",
    color: colourScheme.text,
    width: "100%",
    borderRadius: 5,
    backgroundColor: colourScheme.haze,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 10,
  },
});
