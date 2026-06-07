import { useEffect, useRef } from "react";
import { Platform } from "react-native";

const API = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

/**
 * Registers for Expo push notifications and stores the token
 * against the given driverId in the backend.
 */
export function usePushNotifications(driverId: string | null) {
  const tokenRegistered = useRef(false);

  useEffect(() => {
    if (!driverId || tokenRegistered.current) return;

    registerForPush(driverId).then((registered) => {
      if (registered) tokenRegistered.current = true;
    });
  }, [driverId]);
}

async function registerForPush(driverId: string): Promise<boolean> {
  try {
    // Static imports work fine in Expo — use require to avoid tsconfig module issues
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Notifications = require("expo-notifications");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Device = require("expo-device");

    // Configure notification display behaviour
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList:   true,
        shouldShowAlert:  true,
        shouldPlaySound:  true,
        shouldSetBadge:   true,
      }),
    });

    // Physical device required for push tokens
    if (!Device.isDevice) {
      console.log("[Push] Push notifications require a physical device.");
      return false;
    }

    // Request permission
    const { granted: existingGranted } = await Notifications.getPermissionsAsync();
    let finalGranted = existingGranted;
    if (!existingGranted) {
      const { granted } = await Notifications.requestPermissionsAsync();
      finalGranted = granted;
    }
    if (!finalGranted) {
      console.log("[Push] Permission denied.");
      return false;
    }

    // Get Expo push token
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token: string = tokenData.data;

    // Register Android notification channel
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("jobs", {
        name:             "New Jobs",
        importance:       Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor:       "#C9A84C",
      });
    }

    // Save token to backend
    await fetch(`${API}/api/driver/register-push-token`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ driverId, token }),
    });

    console.log("[Push] Token registered:", token);
    return true;
  } catch (err) {
    console.error("[Push] Registration error:", err);
    return false;
  }
}
