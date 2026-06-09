/**
 * Mobile App Configuration
 *
 * Change API_BASE to your computer's LAN IP so the phone can reach the backend.
 * - Android Emulator: http://10.0.2.2:3000
 * - Real device on same WiFi: http://<your-pc-ip>:3000
 */
export const API_BASE =
  process.env.EXPO_PUBLIC_API_URL || "https://chauffeur-platform-web.vercel.app";
