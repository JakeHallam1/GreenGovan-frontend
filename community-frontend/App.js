import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

// screens
import CodeScreen from "./screens/authorised/CodeScreen";

// custom components
import GenericText from "./src/components/Generic/GenericText";
import { GenericButton } from "./src/components/Generic/GenericButton";
import Menu from "./src/components/Generic/Menu";
import GenericHeader from "./src/components/Generic/GenericHeader";

// custom modules
import { getIconName } from "./src/customModules/icons";

const colourScheme = require("../brandpack/colourScheme.json");

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const [loggedIn, setLoggedIn] = useState(cookies.refreshToken ? true : false);

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer
      style={styles.container}
      documentTitle={{
        formatter: (options, route) =>
          `${options?.title ?? route?.name ?? "Login"} - GreenGovan`,
      }}
    >
      <Drawer.Navigator
        drawerContent={(props) => <Menu {...props} />}
        screenOptions={({ route, navigation }) => ({
          // custom header
          header: () => (
            <GenericHeader
              headerLeft={
                <Ionicons
                  name="add"
                  size={20}
                  color="black"
                  onPress={() => navigation.toggleDrawer()}
                />
              }
              title={
                <GenericText style={styles.title}>{route.name}</GenericText>
              }
              headerRight={
                <Image
                  source={require("../brandpack/logo_transparent.png")}
                  style={styles.logo}
                />
              }
            />
          ),

          // dynamic custom drawer icons
          drawerIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={getIconName(route.name)}
                size={size}
                color={color}
              />
            );
          },

          // drawer config
          drawerType: "permanent",
          headerTitleStyle: styles.title,
          drawerLabelStyle: styles.menuLabel,
          drawerLabel: ({ focused, color, size }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <GenericText size={20} colour={color} weight="500">
                {route.name}
              </GenericText>
            </View>
          ),
          drawerActiveTintColor: colourScheme.primary,
          drawerInactiveTintColor: colourScheme.darkGrey,
        })}
      >
        {/* screens */}

        <Drawer.Screen name="QR Code" component={CodeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
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
  menuLabel: { fontSize: 20 },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: colourScheme.primary,
  },
});
