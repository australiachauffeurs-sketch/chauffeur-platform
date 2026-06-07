import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/lib/ThemeContext";

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
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: DARK, borderTopColor: BORDER, borderTopWidth: 1, paddingBottom: 8, paddingTop: 6, height: 64 },
        tabBarActiveTintColor:   GOLD,
        tabBarInactiveTintColor: GRAY,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tab.Screen name="Home"     component={HomeScreen}
        options={{ tabBarIcon: ({ color }: { color: string }) => <View style={{width:24,height:24,borderRadius:12,borderWidth:1.5,borderColor:color,justifyContent:'center',alignItems:'center'}}><Text style={{color,fontSize:11,fontWeight:'800'}}>H</Text></View> }} />
      <Tab.Screen name="Bookings" component={BookingsScreen}
        options={{ tabBarIcon: ({ color }: { color: string }) => <View style={{width:24,height:24,borderRadius:12,borderWidth:1.5,borderColor:color,justifyContent:'center',alignItems:'center'}}><Text style={{color,fontSize:11,fontWeight:'800'}}>B</Text></View> }} />
      <Tab.Screen name="Profile"  component={ProfileScreen}
        options={{ tabBarIcon: ({ color }: { color: string }) => <View style={{width:24,height:24,borderRadius:12,borderWidth:1.5,borderColor:color,justifyContent:'center',alignItems:'center'}}><Text style={{color,fontSize:11,fontWeight:'800'}}>P</Text></View> }} />
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
      <StatusBar style="light" backgroundColor={BLACK} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false, cardStyle: { backgroundColor: BLACK } }}
        >
          {/* AUTH FLOW — starts here for fresh installs */}
          <Stack.Screen name="Login"          component={LoginScreen} />
          <Stack.Screen name="Signup"         component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="VerifyOTP"      component={VerifyOTPScreen} />
          <Stack.Screen name="ResetPassword"  component={ResetPasswordScreen} />

          {/* APP FLOW — entered after login */}
          <Stack.Screen name="Main"            component={HomeTabs} />
          <Stack.Screen name="Book"            component={BookScreen}          options={{ presentation: "modal", cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="BookingDetail"   component={BookingDetailScreen} options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="Notifications"   component={NotificationsScreen}  options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="PaymentMethods"  component={PaymentMethodsScreen} options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="Reviews"         component={ReviewsScreen}        options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="Support"         component={SupportScreen}        options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="EditProfile"     component={EditProfileScreen}    options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="SavedAddresses"  component={SavedAddressesScreen} options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="RideTracking"    component={RideTrackingScreen}   options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="Settings"        component={SettingsScreen}       options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="Chat"            component={ChatScreen}           options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="EditBooking"     component={EditBookingScreen}    options={{ cardStyle: { backgroundColor: BLACK } }} />
          <Stack.Screen name="Referral"        component={ReferralScreen}       options={{ cardStyle: { backgroundColor: BLACK } }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </ThemeProvider>
  );
}
