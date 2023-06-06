import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Input } from "react-native-elements";
import { useCookies } from "react-cookie";

// custom components
import GenericButton from "../../components/Generic/GenericButton";
import GenericModal from "../../components/Generic/GenericModal";
import GenericText from "../../components/Generic/GenericText";

// endpoints
const ENDPOINTS = require("../../../../endpoints.json");

// colour scheme
const colourScheme = require("../../../../brandpack/colourScheme.json");

export default function LoginScreen(props) {
  // input field refs
  const usernameInput = React.createRef();
  const passwordInput = React.createRef();

  // component state hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loggingIn, setLoggingIn] = useState(false);

  // cookies!! :)
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  // when loggingIn is set to true, handle login procedure
  useEffect(() => {
    if (loggingIn) {
      handleLogin();
    }
  }, [loggingIn]);

  // handles login procedure
  const handleLogin = async () => {
    // send login request with userID and password
    fetch(
      `${ENDPOINTS.backend.baseURL}:${ENDPOINTS.backend.ports.auth}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: username, password: password }),
      }
    )
      .then(async (response) => {
        // if all is well and login successful...
        if (response.ok) {
          const data = await response.json();

          // store access token to cookies
          setCookie("accessToken", data.accessToken);
          setCookie("refreshToken", data.refreshToken);

          setErrorMessage(null);
          props.setLoggedIn(true);
        } else {
          // bells and whistles
          passwordInput.current.shake();
          passwordInput.current.focus();

          setErrorMessage(response.statusText);
        }
        setLoggingIn(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      {/* login modal */}
      <GenericModal
        header={[
          <Image
            key={1}
            source={require("../../../assets/logo_transparent.png")}
            style={styles.logo}
          />,
          <GenericText
            key={2}
            size={20}
            weight="400"
            colour={colourScheme.primary}
          >
            Login
          </GenericText>,
        ]}
        body={
          <View style={{ width: "80%" }}>
            {/* user ID input field */}
            <Input
              key={1}
              ref={usernameInput}
              autoComplete={false}
              autoCorrect={false}
              style={{ outline: "none" }}
              placeholder="Username"
              onChangeText={(value) => setUsername(value)}
              // hit enter to move onto password field
              onSubmitEditing={() => passwordInput.current.focus()}
            ></Input>
            {/* password input field */}
            <Input
              key={2}
              ref={passwordInput}
              autoComplete={false}
              autoCorrect={false}
              style={{ outline: "none" }}
              placeholder="Password"
              onChangeText={(value) => setPassword(value)}
              secureTextEntry={true}
              disabled={username.length == 0}
              // hit enter to login
              onSubmitEditing={() => setLoggingIn(true)}
              errorMessage={errorMessage}
            ></Input>
          </View>
        }
        footer={[
          // login button
          <View key={1} style={styles.buttonContainer}>
            <GenericButton
              key={1}
              onPress={() => setLoggingIn(true)}
              text="Login"
              rounded={true}
              weight="bold"
              colour={colourScheme.primary}
              disabled={!(username.length > 0 && password.length > 0)}
              loading={loggingIn}
            />
          </View>,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: "65%",
    height: 50,
    padding: 10,
    resizeMode: "contain",
  },

  buttonContainer: { margin: 20 },
});
