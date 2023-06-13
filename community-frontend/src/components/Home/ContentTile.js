import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Svg, Defs, LinearGradient, Stop, Rect } from "react-native-svg";
// import LinearGradient from "react-native-linear-gradient";

export default function ContentTile(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <ImageBackground
        style={styles.container}
        source={props.image}
        resizeMode="cover"
      >
        {/* gradient fading to black */}
        <Svg
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            bottom: 0,
          }}
        >
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="70%" stopColor="#00000000" />
              <Stop offset="95%" stopColor="#000000BB" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
        </Svg>
      </ImageBackground>
      {/* title */}
      <Text style={styles.title}>{props.title} →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 300,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    shadowRadius: 15,
    shadowOpacity: 0.05,
  },
  title: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 22,
    color: "white",
    fontWeight: "700",
  },
});
