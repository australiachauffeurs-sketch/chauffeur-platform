import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "ec_driver";

export interface DriverProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rating?: number | null;
  totalTrips?: number | null;
  vehicleMakeModel?: string | null;
  vehiclePlate?: string | null;
  vehicleYear?: string | null;
  vehicleCategory?: string | null;
  vehicleCapacity?: number | null;
}

/** Persist the authenticated driver's profile for the rest of the app to use. */
export async function setDriver(profile: DriverProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    /* non-fatal */
  }
}

/** Load the authenticated driver's profile, or null if not signed in. */
export async function getDriver(): Promise<DriverProfile | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DriverProfile) : null;
  } catch {
    return null;
  }
}

/** Clear the stored driver profile (sign out). */
export async function clearDriver(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {
    /* non-fatal */
  }
}
