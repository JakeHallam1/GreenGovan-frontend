import { StyleSheet, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { TextInput } from "react-native";
import { useState, useEffect } from "react";

import GenericModal from "../Generic/GenericModal";
import GenericText from "../Generic/GenericText";
import GenericButton from "../Generic/GenericButton";

const colourScheme = require("../../../../brandpack/colourScheme.json");

export default function AddPointsModal(props) {
  //references
  const userIDRef = React.createRef();
  const numValRef = React.createRef();

  //states
  const [userID, setUserID] = useState("");
  const [numVal, setNumVal] = useState(0);

  function resetInputs() {
    setUserID("");
    setNumVal(0);
  }

  return (
    <Modal
      isVisible={Boolean(props.visible || false)}
      coverScreen={false}
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
      backdropOpacity={0.3}
      onModalWillShow={() => {
        resetInputs();
      }}
      onBackdropPress={() => props.setVisible(false)}
      animationIn="pulse"
      animationOut="zoomOut"
      animationOutTiming={100}
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={100}
    >
      <GenericModal
        maxWidth={800}
        header={
          <View style={styles.modalHeader}>
            <GenericText size={22} weight={600} colour={colourScheme.text}>
              Add points
            </GenericText>
          </View>
        }
        body={
          <View style={styles.modalBody}>
            <View style={styles.inputContainer}>
              {/* User ID Input */}
              <TextInput
                ref={userIDRef}
                style={[styles.textInput, { outline: "none" }]}
                placeholder={"User ID"}
                placeholderTextColor={colourScheme.lightGrey}
                value={userID}
                onChangeText={(text) => setUserID(text)}
                onSubmitEditing={() => numValRef.current.focus()}
              />
              {/* Points added input */}
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
              {/* "Add" button */}
              <View style={styles.button}>
                <GenericButton
                  text="Add"
                  rounded={true}
                  colour={colourScheme.primary}
                  fontWeight={600}
                  width={100}
                  onPress={() => console.log("Working")}
                />
              </View>
            </View>
          </View>
        }
        footer={<View style={styles.modalFooter}></View>}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalHeader: { width: "100%" },
  modalBody: {},
  modalFooter: {},
  textInput: {
    fontSize: 20,
    fontWeight: "600",
    color: colourScheme.text,
    width: "100%",
    borderRadius: 5,
    backgroundColor: colourScheme.haze,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: "center",
    alignContent: "top",
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
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});
