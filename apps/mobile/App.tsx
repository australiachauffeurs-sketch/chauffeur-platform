import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "./src/lib/ThemeContext";

import HomeScreen           from "./src/screens/HomeScreen";
import BookScreen           from "./src/screens/BookScreen";
import BookingsScreen       from "./src/screens/BookingsScreen";
import BookingDetailScreen  from "./src/screens/BookingDetailScreen";
import ProfileScreen        from "./src/screens/ProfileScreen";
import LoginScreen          from "./src/screens/LoginScreen";
import SignupScreen         from "./src/screens/SignupScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import VerifyOTPScreen      from "./src/screens/VerifyOTPScreen";
import ResetPasswordScreen  from "./src/screens/ResetPasswordScreen";
import NotificationsScreen  from "./src/screens/NotificationsScreen";
import PaymentMethodsScreen from "./src/screens/PaymentMethodsScreen";
import ReviewsScreen        from "./src/screens/ReviewsScreen";
import SupportScreen        from "./src/screens/SupportScreen";
import EditProfileScreen    from "./src/screens/EditProfileScreen";
import SavedAddressesScreen from "./src/screens/SavedAddressesScreen";
import RideTrackingScreen   from "./src/screens/RideTrackingScreen";
import SettingsScreen       from "./src/screens/SettingsScreen";
import ChatScreen           from "./src/screens/ChatScreen";
import EditBookingScreen    from "./src/screens/EditBookingScreen";
import ReferralScreen       from "./src/screens/ReferralScreen";

const GOLD   = "#C9A84C";
const BLACK  = "#0A0A0A";
const DARK   = "#111111";
const BORDER = "#2A2A2A";
const GRAY   = "#6B7280";

const Tab   = createBottomTabNavigator();
const Stack = createStackNavigator();

/* ─────────────────────────────────────────────────────────────────────────
   AUTHENTICATED TABS
   ───────────────────────────────────────────────────────────────────────── */
/* Tab bar icon component */
function TabIcon({ icon, color, focused }: { icon: string; color: string; focused: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={{
      width: 44, height: 32, borderRadius: 16,
      justifyContent: "center", alignItems: "center",
      backgroundColor: focused ? `${colors.gold}22` : "transparent",
    }}>
      <Text style={{ fontSize: 20, color }}>{icon}</Text>
    </View>
  );
}

function HomeTabs() {
  const { colors, isDark } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.darkSurface,
          borderTopColor: `${colors.gold}30`,
          borderTopWidth: 1,
          paddingBottom: 10,
          paddingTop: 4,
          height: 70,
          elevation: 20,
          shadowColor: colors.gold,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.1 : 0.15,
          shadowRadius: 12,
        },
        tabBarActiveTintColor:   colors.gold,
        tabBarInactiveTintColor: isDark ? "#4A4A4A" : colors.gray400,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "700", letterSpacing: 0.3, marginTop: -2 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => <TabIcon icon="🏠" color={color} focused={focused} />,
        }} />
      <Tab.Screen name="Bookings" component={BookingsScreen}
        options={{
          tabBarLabel: "Bookings",
          tabBarIcon: ({ color, focused }) => <TabIcon icon="📋" color={color} focused={focused} />,
        }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => <TabIcon icon="👤" color={color} focused={focused} />,
        }} />
    </Tab.Navigator>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ROOT APP
   ───────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  // Check stored session on mount
  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem("ec_user");
        setInitialRoute(user ? "Main" : "Login");
      } catch {
        setInitialRoute("Login");
      }
    })();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, backgroundColor: BLACK, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={GOLD} size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <RootNavigator initialRoute={initialRoute} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

/* Navigator lives inside ThemeProvider so it can react to the active theme */
function RootNavigator({ initialRoute }: { initialRoute: string }) {
  const { colors, isDark } = useTheme();
  const cardStyle = { backgroundColor: colors.black };

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} backgroundColor={colors.black} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false, cardStyle }}
        >
          {/* AUTH FLOW — starts here for fresh installs */}
          <Stack.Screen name="Login"          component={LoginScreen} />
          <Stack.Screen name="Signup"         component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="VerifyOTP"      component={VerifyOTPScreen} />
          <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen} />

          {/* APP FLOW — entered after login */}
          <Stack.Screen name="Main"            component={HomeTabs} />
          <Stack.Screen name="Book"            component={BookScreen}          options={{ presentation: "modal", cardStyle }} />
          <Stack.Screen name="BookingDetail"   component={BookingDetailScreen} options={{ cardStyle }} />
          <Stack.Screen name="Notifications"   component={NotificationsScreen}  options={{ cardStyle }} />
          <Stack.Screen name="PaymentMethods"  component={PaymentMethodsScreen} options={{ cardStyle }} />
          <Stack.Screen name="Reviews"         component={ReviewsScreen}        options={{ cardStyle }} />
          <Stack.Screen name="Support"         component={SupportScreen}        options={{ cardStyle }} />
          <Stack.Screen name="EditProfile"     component={EditProfileScreen}    options={{ cardStyle }} />
          <Stack.Screen name="SavedAddresses"  component={SavedAddressesScreen} options={{ cardStyle }} />
          <Stack.Screen name="RideTracking"    component={RideTrackingScreen}   options={{ cardStyle }} />
          <Stack.Screen name="Settings"        component={SettingsScreen}       options={{ cardStyle }} />
          <Stack.Screen name="Chat"            component={ChatScreen}           options={{ cardStyle }} />
          <Stack.Screen name="EditBooking"     component={EditBookingScreen}    options={{ cardStyle }} />
          <Stack.Screen name="Referral"        component={ReferralScreen}       options={{ cardStyle }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
