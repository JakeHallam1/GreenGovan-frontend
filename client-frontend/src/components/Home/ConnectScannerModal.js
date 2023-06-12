import { StyleSheet, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import QRCode from "react-native-qrcode-svg";
import { Skeleton } from "@rneui/themed";

import GenericModal from "../Generic/GenericModal";
import GenericText from "../Generic/GenericText";
import GenericButton from "../Generic/GenericButton";

const colourScheme = require("../../../../brandpack/colourScheme.json");

export default function ConnectScannerModal(props) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  return (
    <Modal
      isVisible={Boolean(props.visible || false)}
      coverScreen={false}
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
      backdropOpacity={0.3}
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
            <GenericText size={22} weight={700} colour={colourScheme.text}>
              Connect QR scanner
            </GenericText>
          </View>
        }
        body={
          <View style={styles.modalBody}>
            <View style={styles.qrCodeTitle}>
              <GenericText size={18} weight={700} colour={colourScheme.text}>
                Scan with scanner app
              </GenericText>
            </View>
            {cookies.accessToken ? (
              <QRCode value={cookies.accessToken} size={200} />
            ) : (
              <Skeleton width={200} height={200} />
            )}
            <View style={styles.buttonContainer}>
              {/* "Add" button */}
              <View style={styles.button}>
                <GenericButton
                  text="Done"
                  rounded={true}
                  colour={colourScheme.primary}
                  fontWeight={600}
                  width={100}
                  onPress={() => props.setVisible(false)}
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
  modalHeader: {},
  modalBody: { alignItems: "center", justifyContent: "center" },
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
  qrCodeTitle: {
    margin: 10,
  },
});
