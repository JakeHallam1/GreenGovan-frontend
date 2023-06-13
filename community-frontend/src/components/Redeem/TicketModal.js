import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";

import GenericText from "../Generic/GenericText";
import GenericModal from "../Generic/GenericModal";
import GenericButton from "../Generic/GenericButton";

const colourScheme = require("../../../../brandpack/colourScheme.json");

export default function RedeemModal(props) {
  return (
    <Modal
      isVisible={Boolean(props.visible)}
      coverScreen={false}
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
      backdropOpacity={0.3}
      onBackdropPress={() => {
        props.setVisible(false);
        props.onClose();
      }}
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
              Your ticket
            </GenericText>
          </View>
        }
        body={<View style={styles.modalBody}></View>}
        footer={
          <View style={styles.modalFooter}>
            <View style={styles.buttonContainer}>
              {/* "Redeem" button */}
              <View style={styles.button}>
                <GenericButton
                  text="Close"
                  rounded={true}
                  colour={colourScheme.primary}
                  fontWeight={600}
                  width={100}
                  weight="bold"
                  onPress={() => {
                    props.onSubmit();
                    props.setVisible(false);
                  }}
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
  modalHeader: { width: "100%", textAlign: "center" },
  modalBody: { alignItems: "center", justifyContent: "center" },
  modalFooter: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});
