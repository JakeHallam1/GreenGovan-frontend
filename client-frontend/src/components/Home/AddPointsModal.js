import { StyleSheet, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import GenericModal from "../Generic/GenericModal";
import GenericText from "../Generic/GenericText";
import GenericButton from "../Generic/GenericButton";
import { handleProtectedRequest } from "../../customModules/auth";

const ENDPOINTS = require("../../../../endpoints.json");
const colourScheme = require("../../../../brandpack/colourScheme.json");

export default function AddPointsModal(props) {
  // cookies
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
    "user",
  ]);

  //references
  const userIDRef = React.createRef();
  const addedPointsRef = React.createRef();

  //states
  const [userID, setUserID] = useState("");
  const [addedPoints, setAddedPoints] = useState(0);

  async function handleSubmit() {
    handleProtectedRequest(
      `${ENDPOINTS.backend.baseURL}:${ENDPOINTS.backend.ports.main}/api/points/earn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          points: addedPoints,
        }),
      },
      cookies,
      setCookie,
      removeCookie
    )
      .then(() => {
        props.setVisible(false);
        resetInputs();
      })
      .catch((error) => console.log(error));
  }

  function resetInputs() {
    setUserID("");
    setAddedPoints(0);
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
            {/* Title */}
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
                onSubmitEditing={() => addedPointsRef.current.focus()}
              />
              {/* Points added input */}
              <TextInput
                ref={addedPointsRef}
                style={[styles.numInput, { outline: "none" }]}
                value={addedPoints}
                onChangeText={(text) => {
                  if (!isNaN(Number(text.replace("/[^0-9]/g", "")))) {
                    setAddedPoints(Number(text.replace("/[^0-9]/g", "")));
                  }
                }}
              />
            </View>
          </View>
        }
        footer={
          <View style={styles.modalFooter}>
            <View style={styles.buttonContainer}>
              {/* "Add" button */}
              <View style={styles.button}>
                <GenericButton
                  text="Add"
                  rounded={true}
                  colour={colourScheme.primary}
                  fontWeight={600}
                  width={100}
                  disabled={!(userID.length > 0 && addedPoints > 0)}
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </View>
        }
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
