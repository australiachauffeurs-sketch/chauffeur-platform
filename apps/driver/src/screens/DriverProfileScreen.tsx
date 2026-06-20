import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Switch, Alert, Linking, ActivityIndicator } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { COLORS } from "../lib/theme";
import { useTheme } from "../lib/ThemeContext";
import { supabase } from "../lib/supabase";
import { getDriver, setDriver as saveDriver, clearDriver, DriverProfile } from "../lib/driver";

const API = process.env.EXPO_PUBLIC_API_URL!;

export default function DriverProfileScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoAccept, setAutoAccept]       = useState(false);
  const [driver, setDriver]               = useState<DriverProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      try {
        // First load from cache for instant display
        const cached = await getDriver();
        if (cached) setDriver(cached);

        // Then fetch fresh data from DB via API
        if (cached?.id) {
          const res = await fetch(`${API}/api/driver/profile?driverId=${cached.id}`);
          if (res.ok) {
            const { driver: fresh } = await res.json();
            if (fresh) {
              const updated: DriverProfile = {
                ...cached,
                rating:          fresh.rating ?? null,
                totalTrips:      fresh.total_trips ?? null,
                vehicleMakeModel: [fresh.vehicle_make, fresh.vehicle_model].filter(Boolean).join(" ") || null,
                vehiclePlate:    fresh.vehicle_plate || null,
                vehicleYear:     fresh.vehicle_year  || null,
                vehicleCategory: fresh.vehicle_category || null,
              };
              setDriver(updated);
              await saveDriver(updated); // update cache too
            }
          }
        }
      } catch { /* keep cached */ }
      finally { setLoadingProfile(false); }
    };
    loadProfile();
  }, []);

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel" },
      {
        text: "Sign Out", style: "destructive",
        onPress: async () => {
          try { await supabase.auth.signOut(); } catch {}
          await clearDriver();
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] }));
        },
      },
    ]);
  };

  const vehicleRows: [string, string][] = [
    ["Make & Model", driver?.vehicleMakeModel || (loadingProfile ? "…" : "Not set")],
    ["Plate Number", driver?.vehiclePlate     || (loadingProfile ? "…" : "Not set")],
    ["Year",         driver?.vehicleYear      || (loadingProfile ? "…" : "—")],
    ["Category",     driver?.vehicleCategory  || (loadingProfile ? "…" : "—")],
  ];

  const SETTINGS = [
    { label: "Push Notifications", sub: "Job alerts & updates",    toggle: true,  val: notifications, set: setNotifications },
    { label: "Auto-Accept Trips",   sub: "Accept within your zone", toggle: true,  val: autoAccept,    set: setAutoAccept    },
  ];

  const LINKS: { label: string; sub: string; screen?: string; action?: () => void }[] = [
    { label: "Earnings",            sub: "View trip earnings & stats", screen: "Earnings" },
    { label: "Documents",           sub: "Licence, registration",      action: () => Alert.alert("Documents", "Your licence, insurance and registration are managed by our dispatch team. Contact support to update them.") },
    { label: "Bank Account",        sub: "Payout settings",            action: () => Alert.alert("Payout Settings", "To set up or change your payout bank account, contact dispatch@elitechauffeurs.com.au.") },
    { label: "Support",             sub: "24/7 driver helpline",       action: () => Linking.openURL("tel:+611300123456") },
    { label: "Privacy & Security",  sub: "Account settings",           action: () => Linking.openURL("https://elitechauffeurs.au/privacy") },
    { label: "Terms of Service",    sub: "Driver agreement",           action: () => Linking.openURL("https://elitechauffeurs.au/terms") },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <ScrollView>
        {/* Profile */}
        <View style={styles.profileHero}>
          <View style={[styles.avatar, { backgroundColor: colors.darkMuted, borderColor: colors.gold }]}>
            <Text style={[styles.avatarText, { color: colors.gold }]}>{(driver?.name || "D").charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={[styles.name, { color: colors.white }]}>{driver?.name || "Driver"}</Text>
          <Text style={[styles.sub, { color: colors.gray500 }]}>{driver?.email || ""}</Text>
          <View style={[styles.verifiedBadge, { backgroundColor: `${colors.green}15`, borderColor: `${colors.green}40` }]}>
            <Text style={[styles.verifiedText, { color: colors.green }]}>✓ Verified Driver</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: "Total Trips", value: loadingProfile ? "…" : driver?.totalTrips != null ? `${driver.totalTrips}` : "0" },
            { label: "Rating",      value: loadingProfile ? "…" : (driver?.rating && driver.rating > 0) ? `${Number(driver.rating).toFixed(1)}★` : "New" },
            { label: "Status",      value: "Active" },
          ].map((s) => (
            <View key={s.label} style={[styles.statBox, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
              <Text style={[styles.statValue, { color: colors.gold }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.gray500 }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Vehicle card */}
        <View style={[styles.vehicleCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          <Text style={[styles.vehicleCardTitle, { color: colors.white }]}>My Vehicle</Text>
          {vehicleRows.map(([k, v]) => (
            <View key={k} style={[styles.vehicleRow, { borderBottomColor: colors.darkBorder }]}>
              <Text style={[styles.vehicleKey, { color: colors.gray500 }]}>{k}</Text>
              <Text style={[styles.vehicleVal, { color: colors.white }]}>{v}</Text>
            </View>
          ))}
        </View>

        {/* Toggle settings */}
        <View style={[styles.menuCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          {SETTINGS.map((s) => (
            <View key={s.label} style={[styles.menuItem, { borderBottomColor: colors.darkBorder }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuLabel, { color: colors.white }]}>{s.label}</Text>
                <Text style={[styles.menuSub, { color: colors.gray500 }]}>{s.sub}</Text>
              </View>
              <Switch
                value={s.val}
                onValueChange={s.set}
                trackColor={{ false: colors.darkBorder, true: `${colors.gold}60` }}
                thumbColor={s.val ? colors.gold : colors.gray500}
              />
            </View>
          ))}

          {/* Theme toggle */}
          <View style={[styles.menuItem, { borderBottomWidth: 0, borderBottomColor: colors.darkBorder }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuLabel, { color: colors.white }]}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </Text>
              <Text style={[styles.menuSub, { color: colors.gray500 }]}>Switch app appearance</Text>
            </View>
            <Switch
              value={!isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.darkBorder, true: `${colors.gold}60` }}
              thumbColor={isDark ? colors.gray400 : colors.gold}
            />
          </View>
        </View>

        {/* Links */}
        <View style={[styles.menuCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          {LINKS.map((l, i) => (
            <TouchableOpacity
              key={l.label}
              onPress={() => l.screen ? navigation?.navigate?.(l.screen) : l.action?.()}
              style={[styles.menuItem, { borderBottomColor: colors.darkBorder }, i === LINKS.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.menuLabel, { color: colors.white }]}>{l.label}</Text>
                <Text style={[styles.menuSub, { color: colors.gray500 }]}>{l.sub}</Text>
              </View>
              <Text style={[styles.chevron, { color: colors.gray500 }]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign out */}
        <TouchableOpacity
          style={[styles.signOutBtn, { borderColor: colors.red }]}
          onPress={handleSignOut}
        >
          <Text style={[styles.signOutText, { color: colors.red }]}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={[styles.version, { color: colors.gray500 }]}>Elite Chauffeurs Driver v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: COLORS.black },
  profileHero:    { alignItems: "center", paddingVertical: 28 },
  avatar:         { width: 84, height: 84, borderRadius: 42, backgroundColor: COLORS.darkMuted, borderWidth: 3, borderColor: COLORS.gold, justifyContent: "center", alignItems: "center", marginBottom: 14 },
  avatarText:     { color: COLORS.gold, fontSize: 34, fontWeight: "700" },
  name:           { color: COLORS.white, fontSize: 22, fontWeight: "700", marginBottom: 4 },
  sub:            { color: COLORS.gray500, fontSize: 12, marginBottom: 12 },
  verifiedBadge:  { backgroundColor: `${COLORS.green}15`, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, borderWidth: 1, borderColor: `${COLORS.green}40` },
  verifiedText:   { color: COLORS.green, fontSize: 12, fontWeight: "700" },

  statsRow:       { flexDirection: "row", marginHorizontal: 16, gap: 8, marginBottom: 16 },
  statBox:        { flex: 1, backgroundColor: COLORS.darkSurface, borderRadius: 14, padding: 14, alignItems: "center", borderWidth: 1, borderColor: COLORS.darkBorder },
  statValue:      { color: COLORS.gold, fontSize: 18, fontWeight: "700", marginBottom: 2 },
  statLabel:      { color: COLORS.gray500, fontSize: 10, textAlign: "center" },

  vehicleCard:    { marginHorizontal: 16, backgroundColor: COLORS.darkSurface, borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: COLORS.darkBorder },
  vehicleCardTitle: { color: COLORS.white, fontWeight: "700", fontSize: 15, marginBottom: 12 },
  vehicleRow:     { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  vehicleKey:     { color: COLORS.gray500, fontSize: 13 },
  vehicleVal:     { color: COLORS.white, fontSize: 13, fontWeight: "600" },

  menuCard:       { marginHorizontal: 16, backgroundColor: COLORS.darkSurface, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: COLORS.darkBorder, marginBottom: 14 },
  menuItem:       { flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  menuIcon:       { fontSize: 20, marginRight: 14, width: 28 },
  menuLabel:      { color: COLORS.white, fontSize: 15, fontWeight: "500", marginBottom: 2 },
  menuSub:        { color: COLORS.gray500, fontSize: 11 },
  chevron:        { color: COLORS.gray500, fontSize: 22 },

  signOutBtn:     { marginHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: COLORS.red, paddingVertical: 14, alignItems: "center", marginBottom: 12 },
  signOutText:    { color: COLORS.red, fontWeight: "700", fontSize: 16 },
  version:        { color: COLORS.gray500, fontSize: 11, textAlign: "center", paddingBottom: 28 },
});
