import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { ThemeProvider, useTheme } from "./src/lib/ThemeContext";

import LoginScreen         from "./src/screens/LoginScreen";
import DriverHomeScreen    from "./src/screens/DriverHomeScreen";
import ActiveTripScreen    from "./src/screens/ActiveTripScreen";
import EarningsScreen      from "./src/screens/EarningsScreen";
import DriverProfileScreen from "./src/screens/DriverProfileScreen";
import ChatScreen          from "./src/screens/ChatScreen";
import OnboardingScreen    from "./src/screens/OnboardingScreen";

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

function DriverTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.darkSurface,
          borderTopColor:  colors.darkBorder,
          borderTopWidth:  1,
          paddingBottom:   8,
          paddingTop:      6,
          height:          68,
        },
        tabBarActiveTintColor:   colors.gold,
        tabBarInactiveTintColor: colors.gray500,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tab.Screen
        name="DriverHome" component={DriverHomeScreen}
        options={{ tabBarLabel:"Dashboard", tabBarIcon:({ color }: { color:string }) => <Text style={{ fontSize:14, color, fontWeight:"700" }}>Home</Text> }}
      />
      <Tab.Screen
        name="Earnings" component={EarningsScreen}
        options={{ tabBarIcon:({ color }: { color:string }) => <Text style={{ fontSize:14, color, fontWeight:"700" }}>$</Text> }}
      />
      <Tab.Screen
        name="Profile" component={DriverProfileScreen}
        options={{ tabBarIcon:({ color }: { color:string }) => <Text style={{ fontSize:14, color, fontWeight:"700" }}>Me</Text> }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { colors, isDark } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? "dark" : "dark"} backgroundColor={colors.black} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: colors.black } }}>
          <Stack.Screen name="Login"      component={LoginScreen}      />
          <Stack.Screen name="Main"       component={DriverTabs}       />
          <Stack.Screen name="ActiveTrip" component={ActiveTripScreen}
            options={{ presentation: "modal", cardStyle: { backgroundColor: colors.black } }} />
          <Stack.Screen name="Chat" component={ChatScreen}
            options={{ cardStyle: { backgroundColor: colors.black } }} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen}
            options={{ cardStyle: { backgroundColor: colors.black } }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
